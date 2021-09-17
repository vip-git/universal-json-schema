// Library
import React from 'react';

// Material UI
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

// Props
import checkboxProps, { CheckBoxProps } from './checkbox.props';

export default ({ value, type, onChange, schema = {}, options = {}, ...rest }: CheckBoxProps) => {
  const { 
    onChange: givenOnChange, 
    onGroupChange, 
    onEnumChange, 
    label, 
    choices,
  } = checkboxProps({ onChange, schema, value });
  
  const GroupCheckbox = () => (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>{label}</FormLabel>
      <FormGroup>
        {
          choices.map((o) => (
            <FormControlLabel
              key={o.key}
              control={(
                <Checkbox
                    checked={
                      typeof value === 'string'
                      || Array.isArray(value) ? value?.includes(o.key) 
                        : typeof value === 'boolean' && value
                    }
                    onChange={onGroupChange(String(o.key), o.adds)}
                    disabled={o.disabled || false}
                />
              )}
              label={o.value}
            />
          ))
        }
      </FormGroup>
    </FormControl>
  );

  const CheckboxEnumComponent = () => (
    <>
      {(schema.title || schema.description) && (
        <FormLabel component='legend'>
          {schema.title || schema.description}
        </FormLabel>
      )}
      {
        choices.map((ev) => (
          <FormControlLabel
            key={ev.key}
            control={(
              <Checkbox
                  checked={String(value) === String(ev.key)}
                  onChange={onEnumChange(ev.key, ev.adds)}
                  disabled={ev.disabled || false}
              />
            )}
            label={ev.value}
          />
        ))
      }
    </>
  );

  if (schema.type === 'boolean') {
    const stringToBoolean = !!value;
    return (
      <>
        {schema.description && (<FormLabel component='legend'>{schema.description}</FormLabel>)}
        <FormControlLabel
          control={(
            <Checkbox
                checked={typeof value === 'boolean' ? value : stringToBoolean}
                onChange={givenOnChange}
                disabled={options.disabled || false}
            />
          )}
          label={label}
        />
      </>
    );
  }

  return schema.parsedArray ? (
    <GroupCheckbox />
  ) : <CheckboxEnumComponent />;
};
