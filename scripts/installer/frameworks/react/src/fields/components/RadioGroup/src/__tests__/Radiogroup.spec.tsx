// Library
import React from 'react';
import { mountTheme } from '../../../../../helpers/enzyme-unit-test';

// Internal
import { default as RadioGroupComp } from '..';

// Types
import { JSONSchema7 } from 'json-schema';

const schema: JSONSchema7 = {
  "type": "number",
  "title": "Number enum",
  "enum": [
    1,
    2,
    3
  ]
};

const selectedValue = 1;

describe('Radiogroup', () => {
  it('mounts with standard attributes (control)', () => {
    const path = 'done'; 
    const label = 'Done';
    schema.description = label;
    const wrapper = mountTheme({
      component: (
        <RadioGroupComp 
          label={label} 
          path={path} 
          value={selectedValue} 
          schema={schema}
          htmlid={'test'}
          inputProps={{}}
          nullOption
          onChange={jest.fn}
        />
      )
    });
    const fcComp = wrapper.find('label');
    expect(fcComp).toHaveLength(schema.enum.length);
    schema.enum.forEach((ev, ek) => {
      expect(fcComp.at(ek).text()).toBe(String(ev));

      const cbComp = wrapper.find('ForwardRef(SwitchBase)');
      expect(cbComp).toHaveLength(schema.enum.length);
      expect(cbComp.at(ek).prop('checked')).toBe(ev === selectedValue);
    });
  });

  it('passes additional properties to the Radiogroup component', () => {
    const props = {
      color: 'secondary',
    }
    const wrapper = mountTheme({
      component: (
        <RadioGroupComp 
          options={props}
          path={'a'} 
          schema={schema} 
          value={'checked'} 
          htmlid={'test'}
          inputProps={{}}
          nullOption
          onChange={jest.fn}
        />
      )
    });
    const cbComp = wrapper.find('ForwardRef(RadioGroup)');
    expect(cbComp.prop('color')).toBe(props.color);
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    const wrapper = mountTheme({
      component: (
        <RadioGroupComp 
          path={'a'} 
          value={selectedValue} 
          onChange={onChange} 
          schema={schema} 
          htmlid={'test'}
          inputProps={{}}
          nullOption
        />
      )
    });

    const cbComp = wrapper.find('input');
    expect(cbComp).toHaveLength(schema.enum.length);
    schema.enum.forEach((ev, ek) => {
      cbComp.at(ek).simulate('change');
    });
    // cbComp.at(1).prop('onChange')({
    //   preventDefault: jest.fn,
    //   defaultPrevented: jest.fn,
    //   target: { value: undefined, defaultPrevented: false, }
    // });
    expect(onChange).toHaveBeenCalledTimes(schema.enum.length);
  });
});
