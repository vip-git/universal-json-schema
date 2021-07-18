// Library
import React from 'react';
import { mount } from 'enzyme';

// Internal
import { default as SliderComp } from '..';

// Types
import { JSONSchema7 } from 'json-schema';

const schema: JSONSchema7 = { type: 'boolean' };
const value = 20;

describe('Slider', () => {
  it('mounts with standard attributes (control)', () => {
    const label = 'Done';
    schema.description = label;
    const wrapper = mount(
      <SliderComp 
        label={label}
        value={value}
        onChange={jest.fn}
      />,
    );
    const fcComp = wrapper.find('p');
    expect(fcComp).toHaveLength(1);
    expect(fcComp.text()).toBe(label);

    const cbComp = wrapper.find('ForwardRef(Slider)');
    expect(cbComp).toHaveLength(1);
    expect(cbComp.prop('defaultValue')).toBe(value);
  });

  it('passes additional properties to the Checkbox component', () => {
    const props = {
      color: 'secondary',
    }
    const wrapper = mount(
      <SliderComp 
        value={value}
        onChange={jest.fn}
        options={
          {...props}
        }
      />,
    );

    const cbComp = wrapper.find('ForwardRef(Slider)');
    expect(cbComp.prop('color')).toBe(props.color);
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <SliderComp 
        value={value}
        onChange={onChange}
      />,
    );
    const cbComp = wrapper.find('ForwardRef(Slider)');
    expect(cbComp).toHaveLength(1);
    cbComp.prop('onChange')({});
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
