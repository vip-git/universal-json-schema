import React from 'react';
import MultiSelect from './lib/MaterialSelect';

export default ({ type, value = '[]', options, label, multiSelect, nullOption, disabled, onChange, ...rest }) => {
  const suggestions = options.map(suggestion => ({
    value: suggestion.key,
    label: suggestion.value,
  }));

  const newVal = (value) ? JSON.parse(value) : '';

  return (
    <MultiSelect 
      suggestions={suggestions} 
      value={newVal} 
      onChange={onChange}
      label={label} 
      isDisabled={disabled}
      multiple={multiSelect} 
    />
  );
};
