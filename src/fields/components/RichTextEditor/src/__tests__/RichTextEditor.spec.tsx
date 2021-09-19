// Library
import React from 'react';
import { mountTheme } from '../../../../../helpers/enzyme-unit-test';

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
    const wrapper = mountTheme({
      component: (
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
        />
      )
    });
    const fcComp = wrapper.find('div > div');
    expect(fcComp).toHaveLength(2);
    expect(fcComp.at(0).text()).toBe(label);

    const cbComp = wrapper.find('RichText');
    expect(cbComp).toHaveLength(1);
    expect(cbComp.prop('value')).toBe(String(value));
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    const wrapper = mountTheme({
      component: (
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
        />
      )
    });
    const wrapper2 = mountTheme({
      component: (
        <RichTextEditorComp 
          label={'label'}
          path={'path'}
          value={undefined}
          schema={schema}
          type={'string'}
          options={{}}
          htmlid={'test'}
          nullOption={false}
          onChange={onChange} 
        />
      )
    });
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


  it('calls renderds Editor events', () => {
    const onChange = jest.fn();
    const wrapper = mountTheme({
      component: (
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
        />
      )
    });
    const cbComp = wrapper.find('Editor');
    expect(cbComp).toHaveLength(1);
    cbComp.prop('renderMark')({ mark: {type: 'bold' }}, jest.fn);
    cbComp.prop('renderMark')({ mark: {type: 'code' }}, jest.fn);
    cbComp.prop('renderMark')({ mark: {type: 'italic' }}, jest.fn);
    cbComp.prop('renderMark')({ mark: {type: 'underlined' }}, jest.fn);
    cbComp.prop('renderMark')({ mark: {type: 'heading-one' }}, jest.fn);
    cbComp.prop('renderMark')({ mark: {type: 'heading-two' }}, jest.fn);
    cbComp.prop('renderMark')({ mark: {type: 'heading-three' }}, jest.fn);
    cbComp.prop('renderMark')({ mark: {type: 'numbered-list' }}, jest.fn);
    cbComp.prop('renderMark')({ mark: {type: 'bulleted-list' }}, jest.fn);
    cbComp.prop('onPaste')({ 
      dataTransfer: {
        getData: () => '<b> Hello </b>'
      },
      types: 'html'
    }, 'text/html', jest.fn);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('calls Editor events when clicked', () => {
    const onChange = jest.fn();
    const wrapper = mountTheme({
      component: (
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
        />
      )
    });
    // console.log(wrapper.debug());
    const cbComp = wrapper.find('ForwardRef').find('ForwardRef').find('span');
    expect(cbComp).toHaveLength(20);
    cbComp.at(1).prop('onMouseDown')({
      preventDefault: onChange,
    })
    console.log(cbComp.at(15).text())
    cbComp.at(15).prop('onMouseDown')({
      preventDefault: onChange,
    })
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
