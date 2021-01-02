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
  htmlid,
  onBlur,
}) => (
    <Input 
        htmlid={htmlid} 
        defaultValue={value} 
        {...inputProps({ onChange, onBlur, type, options, uiSchema })} 
    />
);
