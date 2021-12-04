// Library
import React from 'react';
import { mountTheme } from '@helpers/enzyme-unit-test';

// Material UI
import IconButton from '@mui/material/IconButton';

// Internal
import RawFieldSet, {
  FieldSetContent,
} from '../FieldSet';
import { RawFieldSetArray } from '../FieldSetArray';
import { RawFieldSetObject } from '../FieldSetObject';
import ReorderableFormField, { RawReorderableFormField } from '../ReorderableFormField';
import ReorderControls, { RawReorderControls } from '../ReorderControls';
import FormField from '../../FormField';

const { root, row } = {
  root: 'rootClassName',
  row: 'rowClassName',
};

describe('FieldSet', () => {
  describe('FieldSet - control', () => {
    it('mounts (control)', () => {
      const schema = {};
      const data = {};

      // act
      const wrapper = mountTheme({
        component: (
            <RawFieldSet
              classes={{ root }} 
              schema={schema} 
              data={data} 
              path={'path'}
              uiSchema={{}}
              xhrSchema={{}}
              onKeyDown={jest.fn}
              onChange={jest.fn}
              onXHRSchemaEvent={jest.fn}
            />
          )
      });

      // check
      expect(wrapper).toHaveLength(1);
      const ffComp = wrapper.find(FieldSetContent);
      expect(ffComp).toHaveLength(1);
      expect(ffComp.prop('schema')).toBe(schema);
      const legendComp = wrapper.find('legend');
      expect(legendComp).toHaveLength(0);
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
      const wrapper = mountTheme({
        component: (
          <RawFieldSetObject 
              classes={{ row }}
              schema={schema}
              data={data}
              path={''}
              uiSchema={{}}
              xhrSchema={{}}
              onKeyDown={jest.fn}
              onChange={jest.fn}
              onXHRSchemaEvent={jest.fn}
              id={'1'}
              idxKey={'1'}
              validation={{}}
              isTabContent={false}
              tabKey={''}
          />
        )
      });

      // check
      expect(wrapper).toHaveLength(1);
      // expect(wrapper.prop('className')).toMatch(/rowClassName/);
      const ffComp = wrapper.find(FormField);
      expect(ffComp).toHaveLength(1);
      expect(ffComp.prop('path')).toBe('name');
      expect(ffComp.prop('data')).toBe(data.name);
      expect(ffComp.prop('objectData')).toStrictEqual(data);
    });
    it('mounts with single field with additional properties (control)', () => {
      const schema = {
        type: 'object',
        additionalProperties: {
          name: {
            'type': 'string',
            'title': 'Name',
          },
        },
      };

      const data = { name: 'Bob' };

      // act
      const wrapper = mountTheme({
        component: (
          <RawFieldSetObject 
            classes={{ row }}
            schema={schema}
            data={data}
            path={''}
            uiSchema={{}}
            xhrSchema={{}}
            onKeyDown={jest.fn}
            onChange={jest.fn}
            onXHRSchemaEvent={jest.fn}
            id={'1'}
            idxKey={'1'}
            validation={{}}
            isTabContent={false}
            tabKey={''}
          />
        )
      });

      // check
      expect(wrapper).toHaveLength(1);
      // expect(wrapper.prop('className')).toMatch(/rowClassName/);
      const ffComp = wrapper.find(FormField);
      expect(ffComp).toHaveLength(2);
      expect(ffComp.at(1).prop('path')).toBe('name');
      expect(ffComp.at(1).prop('data')).toBe(data.name);
      expect(ffComp.at(1).prop('objectData')).toStrictEqual(data);
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
      const parent = mountTheme({
        component: (
          <RawFieldSetObject 
              classes={{ row }}
              schema={schema} 
              data={data} 
              uiSchema={uiSchema}
              path={''}
              xhrSchema={{}}
              onKeyDown={jest.fn}
              onChange={jest.fn}
              onXHRSchemaEvent={jest.fn}
              id={'1'}
              idxKey={'1'}
              validation={{}}
              isTabContent={false}
              tabKey={''}
          />
        )
      });

      const wrapper = parent.find('RawFieldSetObject');
      // check
      expect(wrapper).toHaveLength(1);
      // expect(wrapper.prop('className')).toMatch(/rowClassName/);
      const ffComp = wrapper.find(FormField);
      expect(ffComp).toHaveLength(1);
      expect(ffComp.prop('path')).toBe('name');
      expect(ffComp.prop('data')).toBe(data.name);
    });
  });

  describe('FieldSetArray', () => {
    it('handles simple, orderable list of strings', () => {
      const path = 'names';
      const defaultValue = 'abc';
      const startIdx = 2;
      const array = [0, 1];
      const schema = {
        type: 'array',
        title: 'My list',
        items: {
          'type': 'string',
          'title': 'Name',
          'default': defaultValue,
        },
      };
      const onMoveItemUp = jest.fn();
      const onMoveItemDown = jest.fn();
      const onDeleteItem = jest.fn();

      onMoveItemUp.mockReturnValue(array.map((i) => (`moveUp${i}`)));
      onMoveItemDown.mockReturnValue(array.map((i) => (`moveDown${i}`)));
      onDeleteItem.mockReturnValue(array.map((i) => (`deleteItem${i}`)));

      const uiSchema = {
        items: {
          'ui:widget': 'textarea',
        },
      };
      const data = ['Bob', 'Harry'];
      const onAddItem = jest.fn();

      // act
      const parent = mountTheme({
        component: (
          <RawFieldSetArray
            startIdx={startIdx}
            onAddItem={onAddItem}
            onMoveItemUp={onMoveItemUp}
            onMoveItemDown={onMoveItemDown}
            onDeleteItem={onDeleteItem}
            uiSchema={uiSchema}
            path={path}
            classes={{ row }}
            schema={schema}
            data={data}
            onXHRSchemaEvent={jest.fn}
          />
        )
      });

      const wrapper = parent.find('RawFieldSetArray');

      // check
      expect(wrapper).toHaveLength(1);
      const ffComp = wrapper.find(ReorderableFormField);
      expect(ffComp).toHaveLength(2);
      array.forEach((i) => {
        expect(ffComp.at(i).prop('path')).toBe(`names[${i + startIdx}]`);
        expect(ffComp.at(i).prop('data')).toBe(data[i]);
        expect(ffComp.at(i).prop('schema')).toBe(schema.items);
        expect(ffComp.at(i).prop('uiSchema')).toBe(uiSchema.items);
        expect(ffComp.at(i).prop('onMoveItemUp')[i]).toBe(`moveUp${i}`);
        expect(ffComp.at(i).prop('onMoveItemDown')[i]).toBe(`moveDown${i}`);
        expect(ffComp.at(i).prop('onDeleteItem')[i]).toBe(`deleteItem${i}`);
      });
      expect(ffComp.at(0).prop('first')).toBe(true);
      expect(ffComp.at(0).prop('last')).toBe(false);
      expect(ffComp.at(1).prop('first')).toBe(false);
      expect(ffComp.at(1).prop('last')).toBe(true);
      const addButton = wrapper.find(IconButton);
      expect(addButton).toHaveLength(3);
      expect(addButton.at(2).prop('onClick')).toBe(undefined);
      expect(onAddItem).toBeCalledWith(path, defaultValue);
    });

    it('handles simple, fixed list of strings', () => {
      const path = 'names';
      const array = [0, 1];
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
      const parent = mountTheme({
        component: (
          <RawFieldSetArray 
            uiSchema={uiSchema} 
            path={path} 
            classes={{ row }} 
            schema={schema} 
            data={data} 
            onXHRSchemaEvent={jest.fn}
          />
        )
      });

      const wrapper = parent.find('RawFieldSetArray');

      // check
      expect(wrapper).toHaveLength(1);
      const ffComp = wrapper.find(FormField);
      const rffComp = wrapper.find(ReorderableFormField);
      expect(ffComp).toHaveLength(2);
      expect(rffComp).toHaveLength(0);
      array.forEach((idx) => {
        expect(ffComp.at(idx).prop('path')).toBe(`names[${idx}]`);
        expect(ffComp.at(idx).prop('data')).toBe(data[idx]);
        expect(ffComp.at(idx).prop('schema')).toBe(schema.items[idx]);
        expect(ffComp.at(idx).prop('uiSchema')).toBe(uiSchema.items[idx]);
      });
    });

    it('handles simple, fixed list of strings with additional items', () => {
      const path = 'names';
      const onMoveItemUp = jest.fn(() => 'onMoveItemUp');
      const onMoveItemDown = jest.fn(() => 'onMoveItemDown');
      const onDeleteItem = jest.fn(() => 'onDeleteItem');

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
      const parent = mountTheme({
        component: (
          <RawFieldSetArray
            onMoveItemUp={onMoveItemUp}
            onMoveItemDown={onMoveItemDown}
            onDeleteItem={onDeleteItem}
            uiSchema={uiSchema}
            path={path}
            classes={{ row }}
            schema={schema}
            data={data}
            onXHRSchemaEvent={jest.fn}
          />
        )
      });

      const wrapper = parent.find('RawFieldSetArray');

      // check
      expect(wrapper).toHaveLength(2);
      const ffComp = wrapper.find(FormField);
      expect(ffComp).toHaveLength(4);
      [0, 1].forEach((i) => {
        expect(ffComp.at(i).prop('path')).toBe(`names[${i}]`);
        expect(ffComp.at(i).prop('data')).toBe(data[i]);
        expect(ffComp.at(i).prop('schema')).toBe(schema.items[i]);
        expect(ffComp.at(i).prop('uiSchema')).toBe(uiSchema.items[i]);
        /** Currently ordering is disable for additional props */
        // expect(ffComp.at(i)).toHaveProperty('onMoveItemUp');
        // expect(ffComp.at(i)).toHaveProperty('onMoveItemDown');
        // expect(ffComp.at(i)).toHaveProperty('onDeleteItem');
      });
      const fsArrayComp = wrapper.find('RawFieldSetArray').at(1);
      expect(fsArrayComp).toHaveLength(1);
      expect(fsArrayComp.prop('path')).toBe(path);
      expect(fsArrayComp.prop('data')).toStrictEqual(['Harry', 'Susan']);
      expect(fsArrayComp.prop('schema')).toStrictEqual({ type: 'array', items: schema.additionalItems });
      expect(fsArrayComp.prop('uiSchema')).toStrictEqual(uiSchema.additionalItems);
      expect(fsArrayComp.prop('startIdx')).toStrictEqual(schema.items.length);
      expect(fsArrayComp.prop('onMoveItemUp')).toStrictEqual(onMoveItemUp);
      expect(fsArrayComp.prop('onMoveItemDown')).toStrictEqual(onMoveItemDown);
      expect(fsArrayComp.prop('onDeleteItem')).toStrictEqual(onDeleteItem);
    });
  });

  describe('ReorderControls', () => {
    it('renders buttons with callbacks', () => {
      // prepare
      const onMoveItemUp = jest.fn();
      const onMoveItemDown = jest.fn();
      const onDeleteItem = jest.fn();

      // act
      const parent = mountTheme({
        component: (
          <RawReorderControls
            onMoveItemDown={onMoveItemDown}
            onDeleteItem={onDeleteItem}
            onMoveItemUp={onMoveItemUp}
            classes={{ row }}
            first
            last={false}
            canReorder
          />
        )
      });

      const wrapper = parent.find('RawReorderControls');

      // check
      expect(wrapper).toHaveLength(1);
      const buttonList = wrapper.find(IconButton);
      expect(buttonList).toHaveLength(3);
      buttonList.at(0).prop('onClick')();
      expect(onMoveItemUp).toHaveBeenCalled();
      buttonList.at(1).prop('onClick')();
      expect(onMoveItemDown).toHaveBeenCalled();
      buttonList.at(2).prop('onClick')();
      expect(onDeleteItem).toHaveBeenCalled();
    });
    it('ReorderControls - first', () => {
      // act
      const parent = mountTheme({
        component: (
          <RawReorderControls 
            first 
            last={false} 
            classes={{ row }} 
            canReorder  
          />
        )
      });

      const wrapper = parent.find('RawReorderControls');

      // check
      expect(wrapper).toHaveLength(1);
      const buttonList = wrapper.find(IconButton);
      expect(buttonList).toHaveLength(3);
      expect(buttonList.at(0).prop('disabled')).toBe(true);
      expect(buttonList.at(1).prop('disabled')).toBe(false);
      expect(buttonList.at(2)).not.toHaveProperty('disabled');
    });
    it('ReorderControls - last', () => {
      // act
      const parent = mountTheme({
        component: (
          <RawReorderControls 
            first={false} 
            last 
            classes={{ row }} 
            canReorder 
          />
        )
      });

      const wrapper = parent.find('RawReorderControls');

      // check
      expect(wrapper).toHaveLength(1);
      const buttonList = wrapper.find(IconButton);
      expect(buttonList).toHaveLength(3);
      expect(buttonList.at(0).prop('disabled')).toBe(false);
      expect(buttonList.at(1).prop('disabled')).toBe(true);
      expect(buttonList.at(2)).not.toHaveProperty('disabled');
    });
  });

  describe('ReorderableFormField', () => {
    it('ReorderableFormField - control', () => {
      const path = 'path';
      const first = true;
      const last = false;
      // act
      const parent = mountTheme({
        component: (
            <RawReorderableFormField
              path={path}
              first={first}
              last={last}
              schema={{ type: 'object' }}
              classes={{ row }}
            />
          )
      });

      const wrapper = parent.find('RawReorderableFormField');

      // check
      const ffComp = wrapper.find(FormField);
      expect(ffComp).toHaveLength(1);
      const controls = wrapper.find(ReorderControls);
      expect(controls).toHaveLength(1);
      expect(controls.prop('first')).toBe(first);
      expect(controls.prop('last')).toBe(last);
    });
  });
});
