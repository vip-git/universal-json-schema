/* globals describe,it */
/* eslint-disable no-unused-expressions */
import React from 'react';
import forEach from 'lodash/forEach';
import chai, { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import IconButton from '@material-ui/core/IconButton';
import {
  RawFieldSet,
  RawFieldSetObject,
  FieldSetArray, RawFieldSetArray,
  FieldSetContent,
  ReorderableFormField, RawReorderableFormField,
  ReorderControls, RawReorderControls,
} from './FieldSet';
import FormField from '../FormField';

const classes = {
  root: 'rootClassName',
  row: 'rowClassName',
};

chai.use(chaiEnzyme());
chai.use(sinonChai);
Enzyme.configure({ adapter: new Adapter() });

describe('FieldSet', () => {
  describe('FieldSet - control', () => {
    it('mounts (control)', () => {
      const schema = {};
      const data = {};

      // act
      const wrapper = shallow(<RawFieldSet classes={classes} schema={schema} data={data} />);

      // check
      expect(wrapper).to.have.length(1);
      const ffComp = wrapper.find(FieldSetContent);
      expect(ffComp).to.have.length(1);
      expect(ffComp).to.have.prop('schema', schema);
      const legendComp = wrapper.find('legend');
      expect(legendComp).to.not.be.present();
    });
  });
  describe('FieldSetObject', () => {
    it('mounts with single field (control)', () => {
      const schema = {
        type: 'object',
        properties: {
          name: {
            'type': 'string',
            'title': 'Name',
          },
        },
      };
      const data = { name: 'Bob' };

      // act
      const wrapper = shallow(<RawFieldSetObject classes={classes} schema={schema} data={data} />);

      // check
      expect(wrapper).to.have.length(1);
      expect(wrapper).to.have.prop('className').not.match(/rowClassName/);
      const ffComp = wrapper.find(FormField);
      expect(ffComp).to.have.length(1);
      expect(ffComp).to.have.prop('path', 'name');
      expect(ffComp).to.have.prop('data', data.name);
      expect(ffComp).to.have.prop('objectData').deep.equal(data);
    });
    it('respects orientation hint', () => {
      const schema = {
        type: 'object',
        properties: {
          name: {
            'type': 'string',
            'title': 'Name',
          },
        },
      };
      const uiSchema = {
        'ui:orientation': 'row',
      };
      const data = { name: 'Bob' };

      // act
      const wrapper = shallow(
        <RawFieldSetObject classes={classes} schema={schema} data={data} uiSchema={uiSchema} />,
      );

      // check
      expect(wrapper).to.have.length(1);
      expect(wrapper).to.have.prop('className').match(/rowClassName/);
      const ffComp = wrapper.find(FormField);
      expect(ffComp).to.have.length(1);
      expect(ffComp).to.have.prop('path', 'name');
      expect(ffComp).to.have.prop('data', data.name);
    });
  });
  describe('FieldSetArray', () => {
    it('handles simple, orderable list of strings', () => {
      const path = 'names';
      const defaultValue = 'abc';
      const startIdx = 2;
      const schema = {
        type: 'array',
        title: 'My list',
        items: {
          'type': 'string',
          'title': 'Name',
          'default': defaultValue,
        },
      };
      const onMoveItemUp = sinon.stub();
      const onMoveItemDown = sinon.stub();
      const onDeleteItem = sinon.stub();
      forEach([0, 1], i => onMoveItemUp.withArgs(path, startIdx + i).returns(`moveUp${i}`));
      forEach([0, 1], i => onMoveItemDown.withArgs(path, startIdx + i).returns(`moveDown${i}`));
      forEach([0, 1], i => onDeleteItem.withArgs(path, startIdx + i).returns(`deleteItem${i}`));
      const uiSchema = {
        items: {
          'ui:widget': 'textarea',
        },
      };
      const data = ['Bob', 'Harry'];
      const onAddItem = sinon.spy();

      // act
      const wrapper = shallow(
        <RawFieldSetArray
          startIdx={startIdx}
          onAddItem={onAddItem}
          onMoveItemUp={onMoveItemUp}
          onMoveItemDown={onMoveItemDown}
          onDeleteItem={onDeleteItem}
          uiSchema={uiSchema}
          path={path}
          classes={classes}
          schema={schema}
          data={data}
        />,
      );

      // check
      expect(wrapper).to.have.length(1);
      const ffComp = wrapper.find(ReorderableFormField);
      expect(ffComp).to.have.length(2);
      forEach([0, 1], (i) => {
        expect(ffComp.at(i)).to.have.prop('path', `names[${i + startIdx}]`);
        expect(ffComp.at(i)).to.have.prop('data', data[i]);
        expect(ffComp.at(i)).to.have.prop('schema', schema.items);
        expect(ffComp.at(i)).to.have.prop('uiSchema', uiSchema.items);
        expect(ffComp.at(i)).to.have.prop('onMoveItemUp', `moveUp${i}`);
        expect(ffComp.at(i)).to.have.prop('onMoveItemDown', `moveDown${i}`);
        expect(ffComp.at(i)).to.have.prop('onDeleteItem', `deleteItem${i}`);
      });
      expect(ffComp.at(0)).to.have.prop('first', true);
      expect(ffComp.at(0)).to.have.prop('last', false);
      expect(ffComp.at(1)).to.have.prop('first', false);
      expect(ffComp.at(1)).to.have.prop('last', true);
      const addButton = wrapper.find(IconButton);
      expect(addButton).to.be.present();
      addButton.simulate('click');
      expect(onAddItem).to.be.calledWith(path, defaultValue);
    });
    it('handles simple, fixed list of strings', () => {
      const path = 'names';
      const schema = {
        type: 'array',
        title: 'My list',
        items: [{
          'type': 'string',
          'title': 'Name',
        }, {
          'type': 'boolean',
          'title': 'Name',
        }],
      };
      const uiSchema = {
        items: [{
          'ui:widget': 'textarea',
        }, {
          'ui:widget': 'checkbox',
        }],
      };
      const data = ['Bob', false];

      // act
      const wrapper = shallow(
        <RawFieldSetArray uiSchema={uiSchema} path={path} classes={classes} schema={schema} data={data} />,
      );

      // check
      expect(wrapper).to.have.length(1);
      const ffComp = wrapper.find(FormField);
      const rffComp = wrapper.find(ReorderableFormField);
      expect(ffComp).to.have.length(2);
      expect(rffComp).to.have.length(0);
      forEach([0, 1], (idx) => {
        expect(ffComp.at(idx)).to.have.prop('path', `names[${idx}]`);
        expect(ffComp.at(idx)).to.have.prop('data', data[idx]);
        expect(ffComp.at(idx)).to.have.prop('schema', schema.items[idx]);
        expect(ffComp.at(idx)).to.have.prop('uiSchema', uiSchema.items[idx]);
      });
    });
    it('handles simple, fixed list of strings with additional items', () => {
      const path = 'names';
      const onMoveItemUp = 'onMoveItemUp';
      const onMoveItemDown = 'onMoveItemDown';
      const onDeleteItem = 'onDeleteItem';

      const schema = {
        type: 'array',
        title: 'My list',
        items: [{
          'type': 'string',
          'title': 'Name',
        }, {
          'type': 'boolean',
          'title': 'Name',
        }],
        additionalItems: {
          'type': 'string',
          'title': 'Name',
        },
      };
      const uiSchema = {
        items: [{
          'ui:widget': 'textarea',
        }, {
          'ui:widget': 'checkbox',
        }],
        additionalItems: {
          'ui:title': 'Children',
        },
      };
      const data = ['Bob', false, 'Harry', 'Susan'];

      // act
      const wrapper = shallow(
        <RawFieldSetArray
          onMoveItemUp={onMoveItemUp}
          onMoveItemDown={onMoveItemDown}
          onDeleteItem={onDeleteItem}
          uiSchema={uiSchema}
          path={path}
          classes={classes}
          schema={schema}
          data={data}
        />,
      );

      // check
      expect(wrapper).to.have.length(1);
      const ffComp = wrapper.find(FormField);
      expect(ffComp).to.have.length(2);
      forEach([0, 1], (i) => {
        expect(ffComp.at(i)).to.have.prop('path', `names[${i}]`);
        expect(ffComp.at(i)).to.have.prop('data', data[i]);
        expect(ffComp.at(i)).to.have.prop('schema', schema.items[i]);
        expect(ffComp.at(i)).to.have.prop('uiSchema', uiSchema.items[i]);
        expect(ffComp.at(i)).to.not.have.prop('onMoveItemUp');
        expect(ffComp.at(i)).to.not.have.prop('onMoveItemDown');
        expect(ffComp.at(i)).to.not.have.prop('onDeleteItem');
      });
      const fsArrayComp = wrapper.find(FieldSetArray);
      expect(fsArrayComp).to.be.present();
      expect(fsArrayComp).to.have.prop('path', path);
      expect(fsArrayComp).to.have.prop('data').deep.equal(['Harry', 'Susan']);
      expect(fsArrayComp).to.have.prop('schema').deep.equal({ type: 'array', items: schema.additionalItems });
      expect(fsArrayComp).to.have.prop('uiSchema', uiSchema.additionalItems);
      expect(fsArrayComp).to.have.prop('startIdx', schema.items.length);
      expect(fsArrayComp).to.have.prop('onMoveItemUp', onMoveItemUp);
      expect(fsArrayComp).to.have.prop('onMoveItemDown', onMoveItemDown);
      expect(fsArrayComp).to.have.prop('onDeleteItem', onDeleteItem);
    });
  });
  describe('ReorderControls', () => {
    it('renders buttons with callbacks', () => {
      // prepare
      const onMoveItemUp = sinon.spy();
      const onMoveItemDown = sinon.spy();
      const onDeleteItem = sinon.spy();

      // act
      const wrapper = shallow(
        <RawReorderControls
          onMoveItemDown={onMoveItemDown}
          onDeleteItem={onDeleteItem}
          onMoveItemUp={onMoveItemUp}
          classes={classes}
        />,
      );

      // check
      expect(wrapper).to.have.length(1);
      const buttonList = wrapper.find(IconButton);
      expect(buttonList).to.have.length(3);
      buttonList.at(0).simulate('click');
      expect(onMoveItemUp).to.have.been.called;
      buttonList.at(1).simulate('click');
      expect(onMoveItemDown).to.have.been.called;
      buttonList.at(2).simulate('click');
      expect(onDeleteItem).to.have.been.called;
    });
    it('ReorderControls - first', () => {
      // act
      const wrapper = shallow(
        <RawReorderControls first last={false} classes={classes} />,
      );

      // check
      expect(wrapper).to.have.length(1);
      const buttonList = wrapper.find(IconButton);
      expect(buttonList).to.have.length(3);
      expect(buttonList.at(0)).to.have.prop('disabled', true);
      expect(buttonList.at(1)).to.have.prop('disabled', false);
      expect(buttonList.at(2)).to.not.have.prop('disabled');
    });
    it('ReorderControls - last', () => {
      // act
      const wrapper = shallow(
        <RawReorderControls first={false} last classes={classes} />,
      );

      // check
      expect(wrapper).to.have.length(1);
      const buttonList = wrapper.find(IconButton);
      expect(buttonList).to.have.length(3);
      expect(buttonList.at(0)).to.have.prop('disabled', false);
      expect(buttonList.at(1)).to.have.prop('disabled', true);
      expect(buttonList.at(2)).to.not.have.prop('disabled');
    });
  });
  describe('ReorderableFormField', () => {
    it('ReorderableFormField - control', () => {
      const path = 'path';
      const first = 'first';
      const last = 'last';
      // act
      const wrapper = shallow(
        <RawReorderableFormField
          path={path}
          first={first}
          last={last}
          classes={classes}
        />,
      );

      // check
      const ffComp = wrapper.find(FormField);
      expect(ffComp).to.have.length(1);
      const controls = wrapper.find(ReorderControls);
      expect(controls).to.have.length(1);
      expect(controls).to.have.prop('first', first);
      expect(controls).to.have.prop('last', last);
    });
  });
});
