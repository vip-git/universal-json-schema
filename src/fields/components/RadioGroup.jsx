import React from 'react';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

export default ({ path, options = [], value, onChange, inputProps, nullOption, ...rest }) => (
  <RadioGroup
    {...rest}
    aria-label={path}
    name={path}
    value={String(value)}
    onChange={onChange}
  >
    {options.map(o => <FormControlLabel key={o.key} value={String(o.key)} control={<Radio />} label={o.value} />)}
  </RadioGroup>
);
