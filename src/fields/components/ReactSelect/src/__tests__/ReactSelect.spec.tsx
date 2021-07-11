// Library
import React from 'react';
import { mount } from 'enzyme';

// Internal
import { default as ReactSelectComp } from '..';

// Types
import { JSONSchema7 } from 'json-schema';

const schema: JSONSchema7 = {
  "type": "string",
  "title": "Example React select",
  "enum": [
    "Yes",
    "No"
  ]
};

const value = 'Yes';

describe('ReactSelect', () => {
  it('mounts with standard attributes (control)', () => {
    const checked = true;
    const path = 'done'; 
    const label = 'Done';
    schema.description = label;
    const wrapper2 = mount(
      <ReactSelectComp
        type={'string'}
        label={label}
        path={path}
        schema={schema}
        value={value}
        uiSchema={{}}
        xhrSchema={{}}
        disabled={false}
        widget={{}}
        onChange={jest.fn}
        schemaVersion='2'
      />,
    );
    const wrapper = mount(
      <ReactSelectComp
        type={'string'}
        label={label}
        path={path}
        schema={schema}
        value={value}
        uiSchema={{}}
        xhrSchema={{}}
        disabled={false}
        widget={{}}
        onChange={jest.fn}
        schemaVersion='3'
      />,
    );
    const fcComp = wrapper.find('label');
    expect(fcComp).toHaveLength(1);
    expect(fcComp.text()).toBe(schema.title);

    const cbComp2 = wrapper2.find('Select');
    expect(cbComp2).toHaveLength(1);
    expect(cbComp2.prop('value')).toBe(value);

    const cbComp = wrapper.find('Select');
    expect(cbComp).toHaveLength(1);
    expect(cbComp.prop('value')).toStrictEqual({"disabled": undefined, "label": "Yes", "style": undefined, "value": "Yes"});
  });

  it('mounts with standard attributes (MultiSelect)', () => {
    const checked = true;
    const path = 'done'; 
    const label = 'Done';
    schema.description = label;
    const wrapper2 = mount(
      <ReactSelectComp
        type={'string'}
        label={label}
        path={path}
        schema={schema}
        value={value}
        uiSchema={{}}
        xhrSchema={{}}
        disabled={false}
        widget={{}}
        onChange={jest.fn}
        schemaVersion='2'
        options={{ multiSelect: true }}
      />,
    );
    const wrapper = mount(
      <ReactSelectComp
        type={'string'}
        label={label}
        path={path}
        schema={schema}
        value={value}
        uiSchema={{}}
        xhrSchema={{}}
        disabled={false}
        widget={{}}
        onChange={jest.fn}
        schemaVersion='3'
        options={{ multiSelect: true }}
      />,
    );
    const fcComp = wrapper.find('label');
    expect(fcComp).toHaveLength(1);
    expect(fcComp.text()).toBe(schema.title);

    const cbComp = wrapper.find('Select');
    expect(cbComp).toHaveLength(1);
    expect(cbComp.prop('value')).toBe(value);
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <ReactSelectComp
        type={'string'}
        label={'label'}
        path={'path'}
        schema={schema}
        uiSchema={{}}
        xhrSchema={{}}
        disabled={false}
        widget={{}}
        onChange={onChange}
        schemaVersion='2'
      />,
    );

    const cbComp = wrapper.find('Select');
    expect(cbComp).toHaveLength(1);
    cbComp.prop('onChange')({
      target: { value: 'No' }
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
