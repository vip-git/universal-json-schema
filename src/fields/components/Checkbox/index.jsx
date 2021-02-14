import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

// Uitls
import { isEnum, isSingleSelect } from '../../utils/enum-utils';

// Props
import checkboxProps from './checkbox.props';

export default ({ value, type, onChange, schema = {}, options = {}, ...rest }) => {
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
              control={(
                <Checkbox
                    checked={value?.includes(o.key)}
                    onChange={onGroupChange(String(o.key))}
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
            control={(
              <Checkbox
                  checked={String(value) === String(ev.key)}
                  onChange={onEnumChange(ev.key)}
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
    return (
      <>
        {schema.description && (<FormLabel component='legend'>{schema.description}</FormLabel>)}
        <FormControlLabel
          control={(
            <Checkbox
                checked={value || false}
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
