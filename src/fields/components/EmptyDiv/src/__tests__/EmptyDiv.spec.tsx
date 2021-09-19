// Library
import React from 'react';
import { mountTheme } from '../../../../../helpers/enzyme-unit-test';

// Internal
import { default as EmptyDivComp } from '..';

// Types
import { JSONSchema7 } from 'json-schema';

const schema: JSONSchema7 = {
  "type": "null",
  "title": "Results"
};

const value = 'Simple Text';

describe('EmptyDiv', () => {
  it('mounts with standard attributes (EmptyDiv)', () => {
    const path = 'done'; 
    const label = 'Done';
    schema.description = label;
    const wrapper = mountTheme({
      component: (
        <EmptyDivComp label={label} htmlid={path} value={value} schema={schema} />
      )
    });
    const fcComp = wrapper.find('div');
    expect(fcComp).toHaveLength(1);
    expect(fcComp.prop('id')).toBe(path);
    expect(fcComp.text()).toBe(schema.title + value);
  });

  it('passes additional properties to the EmptyDiv component', () => {
    const props = {
      color: 'secondary',
    }
    const wrapper = mountTheme({
      component: (
        <EmptyDivComp options={{...props}} schema={schema} />
      )
    });

    const cbComp = wrapper.find('div');
    expect(cbComp.prop('color')).toBe(props.color);
  });

  it('renders the div when no schema is passed', () => {
    const props = {
      color: 'secondary',
    }
    const wrapper = mountTheme({
      component: (
        <EmptyDivComp />
      )
    });

    const cbComp = wrapper.find('div');
    expect(cbComp).toHaveLength(1);
  });
});
