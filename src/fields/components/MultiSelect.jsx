import React from 'react';
import MultiSelect from './lib/MaterialSelect';

export default ({ type, value = '[]', options, label, multiSelect, nullOption, onChange, ...rest }) => {
  const suggestions = options.map((suggestion) => ({
    value: suggestion.key,
    label: suggestion.value,
  }));
  value = (value) ? JSON.parse(value) : '';
  return (
    <MultiSelect suggestions={suggestions} 
                 value={value} 
                 onChange={onChange}
                 label={label} multiple={multiSelect} />
  );
};
