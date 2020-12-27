import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// Props
import checkboxProps from './checkbox.props';

export default ({ value, type, onChange, schema = {}, ...rest }) => {
  const { onChange: givenOnChange, label } = checkboxProps({ onChange, schema });
  /**
   * Todo: add possibility for schema enum
   */
  return (
    <FormControlLabel
      control={(
        <Checkbox
          checked={value || false}
          onChange={givenOnChange}
        />
      )}
      label={label}
    />
  );
};
