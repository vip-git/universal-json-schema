// Library
import React from 'react';
import { TextInput } from 'react-native-paper';

// Internal
import inputProps from './input.props';

export default ({
  type,
  value,
  uiSchema = {},
  options = {},
  onChange,
  isKeyField = false,
  htmlid,
  onBlur,
}) => {
  const inProps = inputProps({ onChange, onBlur, type, options, uiSchema });
  return (isKeyField ? (
    <TextInput 
        htmlid={htmlid} 
        defaultValue={value === null ? '' : value} 
        {...inProps} 
    />
  ) : (
    <TextInput 
          htmlid={htmlid} 
          value={value === null ? '' : value} 
          {...inProps}
    />
  ));
};
