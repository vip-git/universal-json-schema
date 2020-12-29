// Library
import React from 'react';
import { values, mapValues } from 'lodash';

// Internal
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
  schemaVersion,
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
    schemaVersion,
  });
  
  const suggestions = choices.map((suggestion) => ({
    value: suggestion.key,
    label: suggestion.value,
    disabled: suggestion.disabled,
    style: suggestion.style,
  }));

  let newVal = value;

  try {
    if (String(schemaVersion) === '2') {
      newVal = (value) ? JSON.parse(value) : '';
    }
    else {
      const backwardsCompatibleFormat = (givenValue) => givenValue
        .some((t) => typeof t === 'object' && 'value' in t);
      const parseMultiSelectValues = (givenValue) => {
        const parsedValue = schema.parsedArray ? givenValue : JSON.parse(givenValue);
        const isBackwardsCompatibleFormat = backwardsCompatibleFormat(parsedValue);
        if (isBackwardsCompatibleFormat) {
          const finalValues = values(mapValues(parsedValue, 'value'));
          return suggestions.filter((sg) => finalValues.includes(sg.value));
        }
        return suggestions.filter((sg) => parsedValue.includes(sg.value));
      };
      newVal = multiSelect 
        ? parseMultiSelectValues(value) 
        : suggestions.find((sg) => sg.value === value);
    }
  }
  catch (err) {
    newVal = value;
  }

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
