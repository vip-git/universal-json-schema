// Library
import React from 'react';
import { mount } from 'enzyme';
import MomentUtils from '@date-io/moment';

// Internal
import { default as PickerComp } from '..';

// Types
import { JSONSchema7 } from 'json-schema';

const schema: JSONSchema7 = {
  "type": "string",
  "title": "Date"
};
const value = '2010-10-10';

const uiDateTypes = [
  { type: 'material-date', defaultValue: '10-10-2010', changeValue: '2010-10-10' },
  { type: 'material-date-keyboard-disable', defaultValue: '10-10-2010', changeValue: '2010-10-10' },
  { type: 'material-time-keyboard-disable', defaultValue: '12:00 AM', changeValue: '2010-10-10' },
  { type: 'material-time', defaultValue: '12:00 AM', changeValue: '12:00 AM' },
  { type: 'material-datetime', defaultValue: '10-10-2010 12:00 AM', changeValue: '2010-10-10' },
  { type: 'material-datetime-keyboard-disable', defaultValue: '10-10-2010 12:00 AM', changeValue: '2010-10-10' },
];

describe('Picker', () => {
  uiDateTypes.forEach(({ type, defaultValue, changeValue }) => {
    it(`mounts with standard attributes (${type})`, () => {
      const path = 'done'; 
      const label = 'Done';
      schema.description = label;
      const wrapper2 = mount(
          <PickerComp 
            label={label}
            path={path}
            value={value}
            schema={schema}
            uiSchema={{ 'ui:widget': type, 'ui:props': {} }}
            title={label}
            htmlid={'test'}
            type={type}
            onChange={jest.fn}
          />,
      );
      const wrapper3 = mount(
          <PickerComp 
            label={label}
            path={path}
            value={undefined}
            schema={schema}
            uiSchema={{ 'ui:widget': type, 'ui:props': {} }}
            title={label}
            htmlid={'test'}
            type={type}
            onChange={jest.fn}
          />,
      );
      const wrapper = mount(
          <PickerComp 
            label={label}
            path={path}
            value={value}
            schema={schema}
            uiSchema={{ 'ui:widget': type, 'ui:props': { variant: type} }}
            title={label}
            htmlid={'test'}
            type={type}
            onChange={jest.fn}
          />,
      );
      const fcComp = wrapper.find('label');
      expect(fcComp).toHaveLength(1);
      expect(fcComp.text()).toBe(label);
  
      const cbComp = wrapper.find('input');
      expect(cbComp).toHaveLength(1);
      expect(cbComp.prop('value')).toBe(defaultValue);
    });

    it(`passes additional properties to the ${type} component`, () => {
      const props = {
        color: 'secondary',
      }
      const wrapper = mount(
          <PickerComp 
            label={'label'}
            path={'path'}
            value={value}
            schema={schema}
            title={'label'}
            htmlid={'test'}
            type={'string'}
            onChange={jest.fn}
            options={
              {...props} 
            }
          />,
      );

      const cbComp = wrapper.find('WithStyles(ForwardRef(TextField))');
      expect(cbComp.prop('color')).toBe(props.color);
    });

    it(`calls onChange when clicked (${type})`, () => {
      const onChange = jest.fn();
      const wrapper = mount(
          <PickerComp 
            path={'a'}
            value={value}
            onChange={onChange}
            schema={schema}
            label={'label'}
            title={'label'}
            htmlid={'test'}
            type={'string'}
          />,
      );
      const cbComp = wrapper.find('WithStyles(ForwardRef(TextField))');
      expect(cbComp).toHaveLength(1);
      cbComp.prop('onChange')({
        target: { value: changeValue }
      });
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
