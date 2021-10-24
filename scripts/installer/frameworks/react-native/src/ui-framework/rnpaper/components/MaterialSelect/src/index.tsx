// Library
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown'

// Props
import materialSelectProps, { SelectProps } from './select.props';

export default ({ 
  type,
  value = '',
  schema,
  disabled = false,
  onChange,
  htmlid,
  xhrSchema = {},
  options = {},
  ...rest 
}: SelectProps) => {
  const isMultiple = (options.multiple || (schema.anyOf && schema.parsedArray)) && !schema.oneOf;

  const { 
    onChange: givenOnChange,
    choices,
  } = materialSelectProps({ 
    onChange,
    schema,
    type,
    isMultiple,
  });

  const parseMultiSelectValue = (givenValue) => (Array.isArray(givenValue) ? givenValue : [givenValue]);
  
  return (
    <SelectDropdown
        {...options}
        id={htmlid}
        buttonStyle={{
          padding: 0,
          marginTop: 2,
          marginBottom: 15,
          height: 35,
          width: '100%',
          backgroundColor: '#f6f6f6',
          borderColor: 'rgba(0, 0, 0, 0.54)',
          borderRadius: 4,
          borderWidth: 1,
        }}
        buttonTextStyle={{
          fontSize: 14,
          textAlign: 'left'
        }}
        defaultButtonText={' '}
        value={isMultiple ? parseMultiSelectValue(value) : String(value)}
        data={choices}
        onSelect={(selectedItem, index) => givenOnChange({ target: { value: String(selectedItem.key) }})}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return String(selectedItem.value)
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return String(item.value)
        }}
    />
  )
};
