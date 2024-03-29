// Library
import React from 'react';
import { mountTheme } from '@helpers/enzyme-unit-test';

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
    const wrapper = mountTheme({
      component: (
        <InputComp
          value={checked}
          type={'string'}
          options={{}}
          onChange={jest.fn}
          htmlid={'test'}
          onBlur={jest.fn}
        />
      )
    });

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
    const wrapper = mountTheme({
      component: (
        <InputComp  
          value={''} 
          type={'string'}
          options={
            {...props}
          }
          onChange={jest.fn}
          htmlid={'test'}
          onBlur={jest.fn}
        />
      )
    });

    const cbComp = wrapper.find('ForwardRef(InputBase)');
    expect(cbComp.prop('inputProps')).toStrictEqual(props.inputProps);
  });

  it('can pass mui additional properties to the Input component', () => {
    const props = {
      'mui:color': 'primary',
    };
    const wrapper = mountTheme({
      component: (
        <InputComp  
          value={''} 
          type={'string'}
          uiSchema={
            {...props}
          }
          onChange={jest.fn}
          htmlid={'test'}
          onBlur={jest.fn}
        />
      )
    });
    const cbComp = wrapper.find('ForwardRef(InputBase)');
    expect(cbComp.prop('color')).toStrictEqual(props['mui:color']);
  });

  it('can pass additional properties for textArea to the Input component', () => {
    const props = {
      'ui:widget': 'textarea',
    };
    const wrapper = mountTheme({
      component: (
        <InputComp  
          value={''} 
          type={'string'}
          uiSchema={
            {...props}
          }
          onChange={jest.fn}
          htmlid={'test'}
          onBlur={jest.fn}
        />
      )
    });
    const cbComp = wrapper.find('textarea');
    expect(cbComp).toHaveLength(2);
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    const checked = true;
    const wrapper = mountTheme({
      component: (
        <InputComp 
          value={checked} 
          onChange={onChange} 
          type={'string'}
          options={{}}
          htmlid={'test'}
          onBlur={jest.fn}
        />
      )
    });

    const cbComp = wrapper.find('input');
    expect(cbComp).toHaveLength(1);
    cbComp.simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onChange when clicked (keyfield)', () => {
    const onChange = jest.fn();
    const checked = true;
    const wrapper = mountTheme({
      component: (
        <InputComp 
          value={checked} 
          onChange={onChange} 
          type={'string'}
          options={{}}
          htmlid={'test'}
          onBlur={jest.fn}
          isKeyField
        />
      )
    });

    const cbComp = wrapper.find('input');
    expect(cbComp).toHaveLength(1);
    cbComp.simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onChange when clicked (null check)', () => {
    const onChange = jest.fn();
    const wrapper = mountTheme({
      component: (
        <InputComp 
          value={null} 
          onChange={onChange} 
          type={'string'}
          options={{}}
          htmlid={'test'}
          onBlur={jest.fn}
        />
      )
    });

    const cbComp = wrapper.find('input');
    expect(cbComp).toHaveLength(1);
    cbComp.simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });


  it('calls onChange when clicked (null check key field)', () => {
    const onChange = jest.fn();
    const wrapper = mountTheme({
      component: (
        <InputComp 
          value={null} 
          onChange={onChange} 
          type={'string'}
          options={{}}
          htmlid={'test'}
          onBlur={jest.fn}
          isKeyField
        />
      )
    });

    const cbComp = wrapper.find('input');
    expect(cbComp).toHaveLength(1);
    cbComp.simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
