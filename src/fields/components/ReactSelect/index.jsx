import React from 'react';
import MultiSelect from './lib/ReactSelect';

// Props
import reactSelectProps from './react-select.props';

export default ({ 
  type, 
  value = '[]',
  uiSchema,
  schema,
  disabled,
  widget,
  onChange, 
  ...rest 
}) => {
  const { 
    onChange: givenOnChange, 
    choices,
    label, 
    placeholder, 
    multiSelect, 
    nullOption, 
    isClearable,
  } = reactSelectProps({ 
    onChange,
    schema,
    uiSchema,
    type, 
    widget,
  });
  
  const suggestions = choices.map((suggestion) => ({
    value: suggestion.key,
    label: suggestion.value,
    disabled: suggestion.disabled,
    style: suggestion.style,
  }));

  const newVal = (value) ? JSON.parse(value) : '';

  return (
    <MultiSelect 
      suggestions={suggestions} 
      value={newVal} 
      onChange={givenOnChange}
      label={label} 
      isDisabled={disabled}
      multiple={multiSelect} 
      isClearable={isClearable}
      placeholder={placeholder}
    />
  );
};
