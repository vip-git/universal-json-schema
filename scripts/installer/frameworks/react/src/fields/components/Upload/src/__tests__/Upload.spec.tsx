// Library
import React from 'react';
import { mountTheme } from '../../../../../helpers/enzyme-unit-test';

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
    const label = 'Done';
    const uploadProps = {
      variant: 'outlined', 
      accept: '*', 
      isMulti: false, 
      icon: 'hello.png', 
      buttonTitle: 'New Title'
    };
    schema.description = label;
    const wrapper = mountTheme({
      component: (
        <EventContext.Provider value={'jest.fn'}>
          <UploadComp 
            schema={schema} 
            onChange={jest.fn}
            widget={'outlined'}
            htmlid={'test'}
            EventContext={EventContext}
          />
        </EventContext.Provider>
      )
    });
    const wrapper2 = mountTheme({
      component: (
        <EventContext.Provider value={'jest.fn'}>
          <UploadComp  
            schema={schema} 
            onChange={jest.fn}
            widget={'outlined'}
            htmlid={'test'}
            EventContext={EventContext}
            uiSchema={{
              'ui:props': uploadProps
            }}
          />
        </EventContext.Provider>
      )
    });
    const wrapper3 = mountTheme({
      component: (
        <EventContext.Provider value={'jest.fn'}>
          <UploadComp 
            schema={schema} 
            onChange={jest.fn}
            widget={'outlined'}
            htmlid={'test'}
            EventContext={EventContext}
            uiSchema={{
              'ui:options': uploadProps
            }}
          />
        </EventContext.Provider>
      )
    });
    const wrapper4 = mountTheme({
      component: (
        <EventContext.Provider value={'jest.fn'}>
          <UploadComp 
            schema={schema} 
            onChange={jest.fn}
            widget={'outlined'}
            htmlid={'test'}
            EventContext={EventContext}
            uiSchema={{
              'ui:options': {}
            }}
          />
        </EventContext.Provider>
      )
    });
    const wrapper5 = mountTheme({
      component: (
        <EventContext.Provider value={'jest.fn'}>
          <UploadComp 
            schema={schema} 
            onChange={jest.fn}
            htmlid={'test'}
            EventContext={EventContext}
          />
        </EventContext.Provider>
      )
    });
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
    const wrapper = mountTheme({
      component: (
        <EventContext.Provider value={'jest.fn'}>
          <UploadComp 
            {...props} 
            schema={schema} 
            onChange={jest.fn}
            widget={'outlined'}
            htmlid={'test'}
            EventContext={EventContext}
          />
        </EventContext.Provider>
      )
    });

    const cbComp = wrapper.find('UploadButton');
    expect(cbComp.prop('color')).toBe(props.color);
  });

  it('calls onChange when clicked', () => {
    const onUpload: any = jest.fn();
    const onChange = jest.fn();
    const checked = true;
    const wrapper = mountTheme({
      component: (
        <EventContext.Provider value={onUpload}>
          <UploadComp 
            onChange={onChange} 
            schema={schema} 
            widget={'outlined'}
            htmlid={'test'}
            EventContext={EventContext}
          />
        </EventContext.Provider>
      )
    });

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
    expect(onUpload).toHaveBeenCalledTimes(1);
  });

  it('calls onChange when clicked (edge case)', () => {
    const onChange = jest.fn();
    const wrapper = mountTheme({
      component: (
        <EventContext.Provider value={null}>
          <UploadComp 
            onChange={onChange} 
            widget={'outlined'}
            htmlid={'test'}
            EventContext={EventContext}
          />
        </EventContext.Provider>
      )
    });

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
