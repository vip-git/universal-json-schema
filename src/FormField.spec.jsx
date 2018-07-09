/* globals describe,it */
/* eslint-disable no-unused-expressions */
import React from 'react';
import chai, { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { RawFormField as FormField } from './FormField';
import Field from './fields';
import FieldSet from './FieldSet';

const classes = {
  field: 'fieldClassName',
};

chai.use(chaiEnzyme());
chai.use(sinonChai);
Enzyme.configure({ adapter: new Adapter() });

describe('FormField', () => {
  it('mounts with single field (control)', () => {
    const path = 'name';
    const onChange = sinon.stub();
    const schema = {
      'type': 'string',
      'title': 'First Name',
    };
    const uiSchema = {
    };
    const data = 'Bob';
    onChange.returns('onChangeFunc');

    // act
    const wrapper = shallow(
      <FormField path={path} classes={classes} schema={schema} uiSchema={uiSchema} data={data} onChange={onChange} />,
    );

    // check
    expect(wrapper).to.be.present();
    const ffComp = wrapper.find(Field);
    expect(ffComp).to.have.length(1);
    expect(ffComp).to.have.prop('className', classes.field);
    expect(ffComp).to.have.prop('path', path);
    expect(ffComp).to.have.prop('schema', schema);
    expect(ffComp).to.have.prop('data', data);
    expect(ffComp).to.have.prop('uiSchema', uiSchema);
    expect(onChange).calledWith(path);
    expect(ffComp).to.have.prop('onChange', 'onChangeFunc');
  });
  it('spreads additional properties to Field', () => {
    const schema = {
      name: {
        'type': 'string',
      },
    };
    const myProp = 'blah';

    // act
    const wrapper = shallow(
      <FormField classes={classes} schema={schema} myProp={myProp} />,
    );

    // check
    expect(wrapper).to.be.present();
    const ffComp = wrapper.find(Field);
    expect(ffComp).to.have.prop('myProp', myProp);
  });
  it('renders object as FieldSet, passing all properties', () => {
    const onChange = sinon.stub();
    const path = 'name';
    const schema = {
      'type': 'object',
      'properties': {
        firstName: {
          type: 'string',
          title: 'First Name',
        },
        surname: {
          type: 'string',
          title: 'Surname',
        },
      },
    };
    const data = {
      firstName: 'Bob',
      surname: 'Hope',
    };
    const uiSchema = {
      firstName: {},
      surname: {},
    };

    // act
    const wrapper = shallow(
      <FormField classes={classes} uiSchema={uiSchema} path={path} schema={schema} data={data} onChange={onChange} />,
    );

    // check
    expect(wrapper).to.be.present();
    const fsComp = wrapper.find(FieldSet);
    expect(fsComp).to.be.have.length(1);
    expect(fsComp).to.have.prop('path', path);
    expect(fsComp).to.have.prop('schema', schema);
    expect(fsComp).to.have.prop('data', data);
    expect(fsComp).to.have.prop('uiSchema', uiSchema);
    expect(fsComp).to.have.prop('onChange', onChange);
  });
});
