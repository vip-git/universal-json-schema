// Library
import React from 'react';
import { mountTheme } from '@helpers/enzyme-unit-test';

// Internal
import { default as CheckboxComp } from '..';

// Types
import { JSONSchema7 } from 'json-schema';

const schema: JSONSchema7 = { type: 'boolean', title: 'A checkbox' };

describe('Checkbox', () => {
  it('mounts with standard attributes (control)', () => {
    const checked = true;
    const path = 'done'; 
    const label = 'Done';
    schema.description = label;
    const wrapper = mountTheme({
      component: (
        <CheckboxComp 
          label={label} 
          path={path} 
          value={checked} 
          schema={schema}  
        />
      )
    });
    const fcComp = wrapper.find('legend');
    expect(fcComp).toHaveLength(1);
    expect(fcComp.text()).toBe(label);

    const cbComp = wrapper.find('ForwardRef(SwitchBase)');
    expect(cbComp).toHaveLength(1);
    expect(cbComp.prop('checked')).toBe(checked);
  });

  it('passes additional properties to the Checkbox component', () => {
    const props = {
      color: 'secondary',
    }
    const wrapper = mountTheme({
      component: (
        <CheckboxComp 
          options={props}
          schema={schema}  
        />
      )
  });

  const cbComp = wrapper.find('ForwardRef(Checkbox)');
    expect(cbComp.prop('color')).toBe(props.color);
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    const checked = true;
    const wrapper = mountTheme({
      component: (
        <CheckboxComp 
          path={'a'} 
          value={checked} 
          onChange={onChange} 
          schema={schema} 
        />
      )
  });

    const cbComp = wrapper.find('input');
    expect(cbComp).toHaveLength(1);
    cbComp.simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
