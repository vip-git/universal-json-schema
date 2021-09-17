import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

// Props
import radioGroupProps from './radio-group.props';

export default ({ 
  path, 
  options = {},
  value,
  htmlid, 
  inputProps, 
  nullOption,
  schema = {},
  onChange,
  ...rest 
}) => {
  const { choices } = radioGroupProps({ onChange, schema, options });
  return (
      <RadioGroup
        id={htmlid}
        aria-label={path}
        name={path}
        value={String(value)} 
        {...radioGroupProps({ onChange, schema, options })}
        {...options}
      >
        {
          choices 
          && choices.length 
          && choices.map((o) => (
              <FormControlLabel 
                key={o.key} 
                value={String(o.key)} 
                control={<Radio />} 
                label={o.value} 
              />
          ),
          )
        }
      </RadioGroup>
  );
};
