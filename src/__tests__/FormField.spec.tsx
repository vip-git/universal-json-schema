// Library
import React from 'react';
import { mount } from 'enzyme';

// Internal
import { RawFormField as FormField } from '../FormField';
import Field from '../fields';
import FieldSet from '../FieldSet';

describe('FormField', () => {
  it('mounts with single field (control)', () => {
    const path = 'name';
    const onChange = jest.fn(() => 'onChangeFunc');
    const schema = {
      'type': 'string',
      'title': 'First Name',
    };

    const uiSchema = {
    };

    const data = 'Bob';

    // act
    const wrapper = mount(
      <FormField 
        path={path}
        schema={schema}
        uiSchema={uiSchema}
        data={data}
        uiData={{}}
        xhrSchema={{}} 
        prefixId={'test'}
        id={'test'}
        onChange={onChange}
        onXHRSchemaEvent={jest.fn}
      />,
    );

    // check
    expect(wrapper).toHaveLength(1);
    const ffComp = wrapper.find(Field);
    expect(ffComp).toHaveLength(1);
    expect(ffComp.prop('path')).toBe(path);
    expect(ffComp.prop('schema')).toBe(schema);
    expect(ffComp.prop('data')).toBe(data);
    expect(ffComp.prop('uiSchema')).toBe(uiSchema);
    expect(onChange).toBeCalledWith(path);
    expect(ffComp.prop('onChange')).toBe('onChangeFunc');
  });

  it('spreads additional properties to Field', () => {
    const schema = {
      name: {
        'type': 'string',
      },
    };
    const myProp = 'blah';

    // act
    const wrapper = mount(
      <FormField 
        schema={schema}
        myProp={myProp}
        path={''}
        xhrSchema={{}}
        uiSchema={{}}
        data={{}}
        uiData={{}}
        prefixId={'test'}
        id={'test'}
        onChange={jest.fn}
        onXHRSchemaEvent={jest.fn}
      />,
    );

    // check
    expect(wrapper).toHaveLength(1);
    const ffComp = wrapper.find(Field);
    expect(ffComp.prop('myProp')).toBe(myProp);
  });

  it('renders object as FieldSet, passing all properties', () => {
    const onChange = jest.fn();
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
    const wrapper = mount(
      <FormField 
        uiSchema={uiSchema}
        path={path}
        schema={schema}
        data={data}
        onChange={onChange}
        xhrSchema={{}}
        uiData={{}}
        prefixId={'test'}
        id={'test'}
        onXHRSchemaEvent={jest.fn}
      />,
    );

    // check
    expect(wrapper).toHaveLength(1);
    const fsComp = wrapper.find(FieldSet);
    expect(fsComp).toHaveLength(1);
    expect(fsComp.prop('path')).toStrictEqual(path);
    expect(fsComp.prop('schema')).toStrictEqual(schema);
    expect(fsComp.prop('data')).toStrictEqual(data);
    expect(fsComp.prop('uiSchema')).toStrictEqual(uiSchema);
    expect(fsComp.prop('onChange')).toBe(onChange);
  });


  it('renders object as FieldSet, passing all properties (With Errors)', () => {
    const onChange = jest.fn();
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

    const validation = {
      xhr: [
        {
          'rule': 'offline',
          'title': 'You are Offline !',
          'message': 'Please try again once you are online.',
          'callback': jest.fn(),
        },
      ],
    };

    // act
    const wrapper = mount(
      <FormField 
        uiSchema={uiSchema}
        path={path}
        schema={schema}
        data={data}
        onChange={onChange}
        xhrSchema={{}}
        uiData={{}}
        prefixId={'test'}
        validation={validation}
        id={'test'}
        onXHRSchemaEvent={jest.fn}
      />,
    );

    // check
    expect(wrapper).toHaveLength(1);
    const fsComp = wrapper.find(FieldSet);
    expect(fsComp).toHaveLength(1);
    expect(fsComp.prop('path')).toStrictEqual(path);
    expect(fsComp.prop('schema')).toStrictEqual(schema);
    expect(fsComp.prop('data')).toStrictEqual(data);
    expect(fsComp.prop('uiSchema')).toStrictEqual(uiSchema);
    expect(fsComp.prop('validation')).toStrictEqual(validation);
    expect(fsComp.prop('onChange')).toBe(onChange);
  });
});
