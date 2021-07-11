// Library
import React from 'react';
import { mount } from 'enzyme';

// Internal
import { default as RichTextEditorComp } from '..';

// Types
import { JSONSchema7 } from 'json-schema';

const schema: JSONSchema7 = {
  "type": "string",
  "title": "Bio"
};
const value = '<b> Hello </b>';

describe('RichTextEditor', () => {
  it('mounts with standard attributes (control)', () => {
    const path = 'done'; 
    const label = 'Done';
    schema.description = label;
    const wrapper = mount(
      <RichTextEditorComp 
        label={label}
        path={path}
        value={value}
        schema={schema}
        type={'string'}
        options={{}}
        htmlid={'test'}
        nullOption={false}
        onChange={jest.fn}
      />,
    );
    const fcComp = wrapper.find('div > div');
    expect(fcComp).toHaveLength(2);
    expect(fcComp.at(0).text()).toBe(label);

    const cbComp = wrapper.find('RichText');
    expect(cbComp).toHaveLength(1);
    expect(cbComp.prop('value')).toBe(String(value));
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <RichTextEditorComp 
        label={'label'}
        path={'path'}
        value={'checked'}
        schema={schema}
        type={'string'}
        options={{}}
        htmlid={'test'}
        nullOption={false}
        onChange={onChange} 
      />,
    );

    const cbComp = wrapper.find('RichText');
    expect(cbComp).toHaveLength(1);
    cbComp.prop('onChange')({
      object: 'value',
      document: {
        object: 'document',
        data: {},
        nodes: []
      }
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
