import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
