// Library
import React from 'react';
import { mount } from 'enzyme';

// Internal
import { default as CheckboxComp } from '..';

describe('Enum Checkbox', () => {
  it('mounts with standard attributes (control)', () => {
    const checked = 'foo';
    const path = 'done'; 
    const label = 'A single choice list';
    const schema = {
        'type': 'string',
        'title': 'A single choice list',
        'enum': [
          'foo',
          'bar',
          'fuzz',
          'qux'
        ],
        'uniqueItems': true
    };
    const wrapper = mount(
      <CheckboxComp label={label} path={path} value={checked} schema={schema} />,
    );
    const fcComp = wrapper.find('legend');
    expect(fcComp).toHaveLength(1);
    expect(fcComp.text()).toBe(label);

    const cbComp = wrapper.find('ForwardRef(SwitchBase)');
    expect(cbComp).toHaveLength(4);
    expect(cbComp.first().prop('checked')).toBe(true); // <-- add more cases
  });

  it('passes additional properties to the Checkbox component', () => {
    const props = {
      color: 'secondary',
    };
    const schema = { type: 'boolean' };
    const wrapper = mount(
      <CheckboxComp {...props} schema={schema} />,
    );

    const cbComp = wrapper.find('ForwardRef(SwitchBase)');
    expect(cbComp.prop('color')).toBe(props.color);
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    const checked = true;
    const schema = { type: 'boolean' };
    const wrapper = mount(
      <CheckboxComp path={'a'} value={checked} onChange={onChange} schema={schema} />,
    );

    const cbComp = wrapper.find('input');
    expect(cbComp).toHaveLength(1);
    cbComp.simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
