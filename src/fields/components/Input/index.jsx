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
}) => (
    <Input 
        htmlid={htmlid} 
        value={value} 
        {...inputProps({ onChange, type, options, uiSchema })} 
    />
);
