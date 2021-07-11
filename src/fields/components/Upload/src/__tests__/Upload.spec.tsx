// Library
import React from 'react';
import { mount } from 'enzyme';

// Internal
import { default as UploadComp } from '..';

// Types
import { JSONSchema7 } from 'json-schema';

// Helpers
import { EventContext } from '../../../../../helpers/context';

const schema: JSONSchema7 = {
  "type": "string",
  "title": "Please upload your file"
};

describe('Upload', () => {
  it('mounts with standard attributes (control)', () => {
    const checked = true;
    const path = 'done'; 
    const label = 'Done';
    schema.description = label;
    const wrapper = mount(
      <EventContext.Provider value={'jest.fn'}>
        <UploadComp 
          label={label} 
          path={path} 
          value={checked} 
          schema={schema} 
          onChange={jest.fn}
          widget={'outlined'}
          htmlid={'test'}
          EventContext={EventContext}
        />
      </EventContext.Provider>,
    );
    const fcComp = wrapper.find('UploadButton');
    expect(fcComp).toHaveLength(1);
    expect(fcComp.prop('label')).toBe('Please upload your file');

    const cbComp = wrapper.find('input');
    expect(cbComp).toHaveLength(1);
    expect(cbComp.prop('id')).toBe('button-file');
  });

  it('passes additional properties to the Checkbox component', () => {
    const props = {
      color: 'secondary',
    }
    const wrapper = mount(
      <EventContext.Provider value={'jest.fn'}>
        <UploadComp 
          {...props} 
          schema={schema} 
          onChange={jest.fn}
          widget={'outlined'}
          htmlid={'test'}
          EventContext={EventContext}
        />
      </EventContext.Provider>,
    );

    const cbComp = wrapper.find('UploadButton');
    expect(cbComp.prop('color')).toBe(props.color);
  });

  it('calls onChange when clicked', () => {
    const onUpload: any = jest.fn();
    const onChange = jest.fn();
    const checked = true;
    const wrapper = mount(
      <EventContext.Provider value={onUpload}>
        <UploadComp 
          path={'a'} 
          value={checked} 
          onChange={onChange} 
          schema={schema} 
          widget={'outlined'}
          htmlid={'test'}
          EventContext={EventContext}
        />
      </EventContext.Provider>,
    );

    const cbComp = wrapper.find('input');
    expect(cbComp).toHaveLength(1);
    cbComp.prop('onChange')({
      target: {
        files: [{
          name: 'MYFile.txt'
        }]
      }
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
