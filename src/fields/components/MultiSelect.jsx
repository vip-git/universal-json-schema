import React from 'react';
import MultiSelect from './lib/MaterialSelect';

export default ({ type, value = '[]', options, label, multiSelect, nullOption, onChange, ...rest }) => {
  const suggestions = options.map(suggestion => ({
    value: suggestion.key,
    label: suggestion.value,
  }));

  const newVal = (value) ? JSON.parse(value) : '';

  return (
    <MultiSelect 
      isDisabled
      suggestions={suggestions} 
      value={newVal} 
      onChange={onChange}
      label={label} 
      multiple={multiSelect} 
    />
  );
};
