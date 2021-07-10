// Library
import React from 'react';
import Input from '@material-ui/core/Input';

// Internal
import inputProps from './input.props';

export default ({
  type,
  value,
  uiSchema = {},
  options,
  onChange,
  isKeyField = false,
  htmlid,
  onBlur,
}) => {
  const inProps = inputProps({ onChange, onBlur, type, options, uiSchema });
  return (isKeyField ? (
    <Input 
        htmlid={htmlid} 
        defaultValue={value === null ? '' : value} 
        {...inProps} 
    />
  ) : (
    <Input 
          htmlid={htmlid} 
          value={value === null ? '' : value} 
          {...inProps}
    />
  ));
};
