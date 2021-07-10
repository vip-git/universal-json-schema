// Library
import React from 'react';
import { mount } from 'enzyme';

// Internal
import { default as CheckboxComp } from '..';

// Types
import { JSONSchema7, JSONSchema7Type } from 'json-schema';

const schema: JSONSchema7 & { parsedArray: boolean } = {
  'type': 'string',
  'title': 'A multiple choices list',
  'enum': [
      'foo',
      'bar',
      'fuzz',
      'qux'
  ],
  'uniqueItems': true,
  'parsedArray': true
};

const checked: Array<JSONSchema7Type> = [
  "foo",
  "bar"
];

describe('Group Checkbox', () => {
  it('mounts with standard attributes (control)', () => {
    const path = 'done'; 
    const label = 'A multiple choices list';
    const wrapper = mount(
      <CheckboxComp label={label} path={path} value={checked} schema={schema} />,
    );
    const fcComp = wrapper.find('legend');
    expect(fcComp).toHaveLength(1);
    expect(fcComp.text()).toBe(label);

    const cbComp = wrapper.find('ForwardRef(SwitchBase)');
    expect(cbComp).toHaveLength(schema.enum.length);
    schema.enum.forEach((en, ek) => {
      expect(cbComp.at(ek).prop('checked')).toBe(checked.includes(en));
    });
  });

  it('passes additional properties to the Checkbox component', () => {
    const props = {
      color: 'secondary',
    };
    const wrapper = mount(
      <CheckboxComp {...props} schema={schema} />,
    );

    const cbComp = wrapper.find('ForwardRef(SwitchBase)');
    schema.enum.forEach((en, ek) => {
      expect(cbComp.at(ek).prop('color')).toBe(props.color);
    });
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <CheckboxComp path={'a'} value={checked} onChange={onChange} schema={schema} />,
    );

    const cbComp = wrapper.find('input');
    expect(cbComp).toHaveLength(schema.enum.length);
    schema.enum.forEach((en, ek) => {
      cbComp.at(ek).simulate('change');
    });
    expect(onChange).toHaveBeenCalledTimes(schema.enum.length);
  });
});
