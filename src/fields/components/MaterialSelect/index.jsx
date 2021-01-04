import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// Props
import materialSelectProps from './select.props';

export default ({ 
  type, 
  value = '',
  schema,
  disabled,
  onChange, 
  htmlid,
  options = {},
  ...rest 
}) => {
  const { 
    onChange: givenOnChange, 
    choices,
    label,  
    nullOption, 
  } = materialSelectProps({ 
    onChange,
    schema,
    type, 
  });
  
  return (
    <Select
      {...options}
      id={htmlid}
      value={String(value)}
      onChange={givenOnChange}
    >
      {value === null && <MenuItem value={''}>{nullOption}</MenuItem>}
      {choices.map((o) => <MenuItem key={o.key} value={String(o.key)}>{String(o.value)}</MenuItem>)}
    </Select>
  );
};
