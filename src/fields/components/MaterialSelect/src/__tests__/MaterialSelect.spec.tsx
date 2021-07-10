// Library
import React from 'react';
import { mount } from 'enzyme';

// Internal
import { default as MaterialSelectComp } from '..';

// Types
import { JSONSchema7 } from 'json-schema';

const schema: JSONSchema7 = {
  "type": "string",
  "title": "Which  Theme ?",
  "enum": [
    "Material UI",
    "No Theme"
  ],
  "default": "Material UI"
};
const value = 'Material UI';
const htmlid = 'test';

describe('MaterialSelect', () => {
  it('mounts with standard attributes (control)', () => {
    const path = 'done'; 
    const label = 'Done';
    schema.description = label;
    const wrapper = mount(
      <MaterialSelectComp 
        type={'string'}
        htmlid={htmlid}
        label={label}
        path={path}
        value={value}
        schema={schema}
        onChange={jest.fn}
      />,
    );
    
    const fcComp = wrapper.find('WithStyles(ForwardRef(Select))');
    expect(fcComp).toHaveLength(1);
    expect(fcComp.prop('id')).toBe(htmlid);

    const cbComp = wrapper.find('input');
    expect(cbComp).toHaveLength(1);
    expect(cbComp.prop('value')).toBe(value);
  });

  it('passes additional properties to the Checkbox component', () => {
    const props = {
      color: 'secondary',
    }
    const wrapper = mount(
      <MaterialSelectComp
        type={'string'}
        htmlid={htmlid}
        label={'label'}
        path={'path'}
        schema={schema}
        onChange={jest.fn}
        options={
          {...props}
        }
      />,
    );

    const cbComp = wrapper.find('WithStyles(ForwardRef(Select))');
    expect(cbComp.prop('color')).toBe(props.color);
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <MaterialSelectComp 
        path={'a'} 
        value={value} 
        onChange={onChange} 
        schema={schema}
        type={'string'}
        htmlid={htmlid}
        label={'label'}
      />,
    );

    const cbComp = wrapper.find('input');
    expect(cbComp).toHaveLength(1);
    cbComp.simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
