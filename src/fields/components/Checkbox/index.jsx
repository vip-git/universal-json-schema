import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

// Uitls
import { isEnum } from '../../utils/enum-utils';

// Props
import checkboxProps from './checkbox.props';

export default ({ value, type, onChange, schema = {}, ...rest }) => {
  const { onChange: givenOnChange, onGroupChange, label, choices } = checkboxProps({ onChange, schema });
  const GroupCheckbox = () => (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>{label}</FormLabel>
      <FormGroup>
        {
          choices.map((o) => (
            <FormControlLabel
              control={(
                <Checkbox
                    checked={String(value) === String(o.key)}
                    onChange={onGroupChange(String(o.key))}
                />
              )}
              label={o.value}
            />
          ))
        }
      </FormGroup>
    </FormControl>
  );
  return isEnum(schema) ? (
    <GroupCheckbox />
  ) : (
    <>
      {schema.description && (<FormLabel component='legend'>{schema.description}</FormLabel>)}
      <FormControlLabel
        control={(
          <Checkbox
              checked={value || false}
              onChange={givenOnChange}
          />
        )}
        label={label}
      />
    </>
  );
};
