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
  isKeyField,
  htmlid,
  onBlur,
}) => (isKeyField ? (
    <Input 
        htmlid={htmlid} 
        defaultValue={value === null ? '' : value} 
        {...inputProps({ onChange, onBlur, type, options, uiSchema })} 
    />
) : (
  <Input 
        htmlid={htmlid} 
        value={value === null ? '' : value} 
        {...inputProps({ onChange, onBlur, type, options, uiSchema })}
  />
));
