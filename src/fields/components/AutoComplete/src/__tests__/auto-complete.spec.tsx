// Library
import React from 'react';
import { mount } from 'enzyme';

// Internal
import { default as AutoCompleteComp } from '..';

// Types
import { JSONSchema7 } from 'json-schema';

const schema: JSONSchema7 = {
    "type": "string",
    "title": "Example Auto Complete",
    "enum": ["Yes", "No"]
};

const value = 'Simple Text';

describe('AutoComplete', () => {
  it('mounts with standard attributes (AutoComplete)', () => {
    const path = 'done'; 
    const label = 'Done';
    schema.description = label;
    const wrapper = mount(
      <AutoCompleteComp type={'string'} onChange={jest.fn} label={label} htmlid={path} value={value} schema={schema} />,
    );
    const fcComp = wrapper.find('WithStyles(ForwardRef(TextField))');
    expect(fcComp).toHaveLength(1);
    expect(fcComp.prop('value')).toBe(value);
  });

  it('passes additional properties to the AutoComplete component', () => {
    const props = {
      color: 'secondary',
    };
    const path = 'done'; 
    const wrapper = mount(
      <AutoCompleteComp type={'string'} htmlid={path} onChange={jest.fn} options={{...props}} schema={schema} />,
    );
    const cbComp = wrapper.find('WithStyles(ForwardRef(Autocomplete))');
    expect(cbComp.prop('color')).toBe(props.color);
  });

  it('renders the div when no schema is passed', () => {
    const props = {
      color: 'secondary',
    };
    const path = 'done'; 
    const wrapper = mount(
      <AutoCompleteComp schema={schema} type={'string'} htmlid={path} onChange={jest.fn} />,
    );

    const cbComp = wrapper.find('div');
    expect(cbComp).toHaveLength(4);
  });
});
