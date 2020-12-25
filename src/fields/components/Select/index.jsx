import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default ({ type, value = '', options, label, htmlid, nullOption, onChange, ...rest }) => {
  return (
    <Select
      {...rest}
      id={htmlid}
      value={String(value)}
      onChange={onChange}
    >
      {value === null && <MenuItem value={''}>{nullOption}</MenuItem>}
      {options.map(o => <MenuItem key={o.key} value={String(o.key)}>{String(o.value)}</MenuItem>)}
    </Select>
  );
};
