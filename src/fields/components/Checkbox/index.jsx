import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const doOnChange = onChange => (e, checked) => onChange(checked);

export default ({ path, label, value, type, onChange, ...rest }) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={value}
        value={path}
        onChange={doOnChange(onChange)}
        {...rest}
      />
    }
    label={label}
  />
);
