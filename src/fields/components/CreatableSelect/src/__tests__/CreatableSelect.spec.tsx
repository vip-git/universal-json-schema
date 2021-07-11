// Library
import React from 'react';
import { mount } from 'enzyme';

// Internal
import { default as CreatableReactSelectComp } from '..';

// Types
import { JSONSchema7 } from 'json-schema';

const schema: JSONSchema7 & { parsedArray?: boolean } = {
  'type': 'string',
  'title': 'Example React select',
  'enum': [
    'Yes',
    'No'
  ]
};

const value = 'Yes';

describe('CreatableReactSelect', () => {
  it('mounts with standard attributes (control)', () => {
    const value4: any = [{'disabled': undefined, 'label': 'Yes', 'style': undefined, 'value': 'Yes'}];
    const value5: any = ['Yes'];
    const path = 'done'; 
    const label = 'Done';
    schema.description = label;
    const wrapper2 = mount(
      <CreatableReactSelectComp
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
    const wrapper6 = mount(
      <CreatableReactSelectComp
        type={'string'}
        label={label}
        path={path}
        value={value}
        disabled={false}
        widget={{}}
        onChange={jest.fn}
        schemaVersion='3'
      />,
    );
    const wrapper = mount(
      <CreatableReactSelectComp
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

    const wrapper3 = mount(
      <CreatableReactSelectComp
        type={'string'}
        label={label}
        path={path}
        schema={schema}
        value={JSON.stringify([value])}
        uiSchema={{}}
        xhrSchema={{}}
        disabled={false}
        widget={{}}
        onChange={jest.fn}
        schemaVersion='3'
      />,
    );

    const wrapper5 = mount(
      <CreatableReactSelectComp
        type={'string'}
        label={label}
        path={path}
        schema={{
          ...schema,
          anyOf: [],
          parsedArray: true,
        }}
        value={value4}
        uiSchema={{}}
        xhrSchema={{}}
        disabled={false}
        widget={{}}
        onChange={jest.fn}
        schemaVersion='3'
      />,
    );

    const wrapper46 = mount(
      <CreatableReactSelectComp
        type={'string'}
        label={label}
        path={path}
        schema={{
          ...schema,
          anyOf: [],
          parsedArray: true,
        }}
        value={value5}
        uiSchema={{}}
        xhrSchema={{}}
        disabled={false}
        widget={{}}
        onChange={jest.fn}
        schemaVersion='3'
      />,
    );
    const fcComp = wrapper.find('span');
    expect(fcComp).toHaveLength(1);
    expect(fcComp.text()).toBe(schema.title);

    const cbComp2 = wrapper2.find('Select');
    expect(cbComp2).toHaveLength(1);
    expect(cbComp2.prop('value')).toBe(value);

    const cbComp = wrapper.find('Select');
    expect(cbComp).toHaveLength(1);
    expect(cbComp.prop('value')).toStrictEqual('Yes');
  });

  it('mounts with standard attributes (MultiSelect)', () => {
    const value4: any = [{'disabled': undefined, 'label': 'Yes', 'style': undefined, 'value': 'Yes'}];
    const value5: any = ['Yes'];
    const path = 'done'; 
    const label = 'Done';
    schema.description = label;
    const wrapper2 = mount(
      <CreatableReactSelectComp
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

    const wrapper4 = mount(
      <CreatableReactSelectComp
        type={'string'}
        label={label}
        path={path}
        schema={schema}
        value={null}
        uiSchema={{}}
        xhrSchema={{}}
        disabled={false}
        widget={{}}
        onChange={jest.fn}
        schemaVersion='2'
        options={{ multiSelect: true }}
      />,
    );

    const wrapper3 = mount(
      <CreatableReactSelectComp
        type={'string'}
        label={label}
        path={path}
        schema={schema}
        value={value4}
        uiSchema={{}}
        xhrSchema={{}}
        disabled={false}
        widget={{}}
        onChange={jest.fn}
        schemaVersion='3'
        options={{ multiSelect: true }}
      />,
    );

    const wrapper36 = mount(
      <CreatableReactSelectComp
        type={'string'}
        label={label}
        path={path}
        schema={schema}
        value={value5}
        uiSchema={{}}
        xhrSchema={{}}
        disabled={false}
        widget={{}}
        onChange={jest.fn}
        schemaVersion='3'
        options={{ multiSelect: true }}
      />,
    );

    const wrapper5 = mount(
      <CreatableReactSelectComp
        type={'string'}
        label={label}
        path={path}
        schema={{
          ...schema,
          anyOf: [],
          parsedArray: true,
        }}
        value={value4}
        uiSchema={{}}
        xhrSchema={{}}
        disabled={false}
        widget={{}}
        onChange={jest.fn}
        schemaVersion='3'
        options={{ multiSelect: true }}
      />,
    );

    const wrapper7 = mount(
        <CreatableReactSelectComp
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
          options={{ multiSelect: true, optionsOnly: true }}
        />,
      );

    const wrapper = mount(
      <CreatableReactSelectComp
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
    const fcComp = wrapper.find('span');
    expect(fcComp).toHaveLength(1);
    expect(fcComp.text()).toBe(schema.title);

    const cbComp = wrapper.find('Select');
    expect(cbComp).toHaveLength(1);
    expect(cbComp.prop('value')).toBe(value);
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <CreatableReactSelectComp
        type={'string'}
        label={'label'}
        path={'path'}
        value={[]}
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
    cbComp.prop('onChange')(['No'], {
        action: ''
    });
    cbComp.prop('onInputChange')('No');
    cbComp.prop('onKeyDown')({
        key: 'Tab',
        preventDefault: jest.fn
    });
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('calls onChange when clicked (Multi-Select)', () => {
    const value4: any = [{'label': 'Yes', 'value': 'Yes'}];
    const onChange = jest.fn();
    const wrapper = mount(
      <CreatableReactSelectComp
        type={'string'}
        schema={{
          ...schema,
          anyOf: [],
          parsedArray: true,
        }}
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

    const cbComp = wrapper.find('Select');
    expect(cbComp).toHaveLength(1);
    cbComp.prop('onChange')(['No'], {
        action: ''
    });
    cbComp.prop('onInputChange')('No Yes');
    cbComp.prop('onKeyDown')({
        key: 'Enter',
        preventDefault: jest.fn
    });
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('calls onChange when clicked (Single-Select) Edge case', () => {
    const value4: any = JSON.stringify([{'label': 'Yes', 'value': 'Yes'}]);
    const onChange = jest.fn();
    const wrapper = mount(
      <CreatableReactSelectComp
        type={'string'}
        schema={{
          ...schema,
        }}
        value={[]}
        uiSchema={{}}
        xhrSchema={{}}
        disabled={false}
        widget={{}}
        onChange={jest.fn}
        schemaVersion='3'
      />,
    );

    const cbComp = wrapper.find('Select');
    expect(cbComp).toHaveLength(1);
    cbComp.prop('onChange')([], {
        action: ''
    });
    cbComp.prop('onInputChange')('');
    cbComp.prop('onKeyDown')({
        key: 'Enter',
        preventDefault: jest.fn
    });
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('calls onChange when clicked (Multi-Select) Edge case', () => {
    const value4: any = JSON.stringify([{'label': 'Yes', 'value': 'Yes'}]);
    const onChange = jest.fn();
    const wrapper = mount(
      <CreatableReactSelectComp
        type={'string'}
        schema={{
          ...schema,
        }}
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

    const cbComp = wrapper.find('Select');
    expect(cbComp).toHaveLength(1);
    cbComp.prop('onChange')({
      target: { value: value4 }
    }, {
        action: ''
    });
    cbComp.prop('onInputChange')('No');
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('calls onChange when clicked (Single-Select) Edge case 2', () => {
    const value4: any = true;
    const onChange = jest.fn();
    const wrapper = mount(
      <CreatableReactSelectComp
        type={'string'}
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

    const cbComp = wrapper.find('Select');
    expect(cbComp).toHaveLength(1);
    cbComp.prop('onChange')({
      target: { value: {'value4': ''} }
    }, {
        action: ''
    });
    cbComp.prop('onInputChange')('No');
    expect(onChange).toHaveBeenCalledTimes(0);
  });
});
