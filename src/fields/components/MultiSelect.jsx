import React from 'react';
import MultiSelect from './MaterialSelect';

export default ({ type, value = '', options, label, multiSelect, nullOption, onChange, ...rest }) => {
  return (
    // <Select
    //   {...rest}
    //   value={String(value)}
    //   onChange={onChange}
    // >
    //   {value === null && <MenuItem value={''}>{nullOption}</MenuItem>}
    //   {options.map(o => <MenuItem key={o.key} value={String(o.key)}>{String(o.value)}</MenuItem>)}
    // </Select>
    <MultiSelect suggestions={[{ label: 'Afghanistan', value: 'AFG'}]} label={label} multiple={multiSelect} />
  );
};
