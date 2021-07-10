// Library
import React from 'react';
import { mount } from 'enzyme';

// Internal
import { default as InputComp } from '..';

// Types
import { JSONSchema7 } from 'json-schema';

const schema: JSONSchema7 = { type: 'string' };

describe('Input', () => {
  it('mounts with standard attributes (control)', () => {
    const checked = true;
    const label = 'Done';
    schema.title = label;
    const wrapper = mount(
      <InputComp
        value={checked}
        type={'string'}
        options={{}}
        onChange={jest.fn}
        isKeyField={false}
        htmlid={'test'}
        onBlur={jest.fn}
      />,
    );

    const fcComp = wrapper.find('ForwardRef(InputBase)');
    expect(fcComp).toHaveLength(1);
    expect(fcComp.prop('htmlid')).toBe('test');

    const cbComp = wrapper.find('input');
    expect(cbComp).toHaveLength(1);
    expect(cbComp.prop('value')).toBe(checked);
  });

  it('passes additional properties to the Input component', () => {
    const props = {
      inputProps: {
        color: 'secondary',
      }
    }
    const wrapper = mount(
      <InputComp  
        value={''} 
        type={'string'}
        options={
          {...props}
        }
        onChange={jest.fn}
        isKeyField={false}
        htmlid={'test'}
        onBlur={jest.fn}
      />,
    );

    const cbComp = wrapper.find('ForwardRef(InputBase)');
    expect(cbComp.prop('inputProps')).toStrictEqual(props.inputProps);
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    const checked = true;
    const wrapper = mount(
      <InputComp 
        value={checked} 
        onChange={onChange} 
        type={'string'}
        options={{}}
        isKeyField={false}
        htmlid={'test'}
        onBlur={jest.fn}
      />,
    );

    const cbComp = wrapper.find('input');
    expect(cbComp).toHaveLength(1);
    cbComp.simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
