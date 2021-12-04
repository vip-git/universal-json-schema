// Library
import React from 'react';
import { TextInput } from 'react-native-paper';

// Internal
import inputProps from './input.props';

const style =  {
  marginBottom: 15,
};

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
        style={style}
        mode={'outlined'}
        dense
        defaultValue={value === null ? '' : value} 
        {...inProps} 
    />
  ) : (
    <TextInput 
          htmlid={htmlid} 
          style={style}
          mode={'outlined'}
          value={value === null ? '' : value} 
          dense
          {...inProps}
    />
  ));
};
