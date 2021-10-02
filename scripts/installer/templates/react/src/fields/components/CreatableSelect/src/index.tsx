import React from 'react';
import { isEmpty, values, mapValues } from 'lodash';
import { JSONSchema7 } from 'json-schema';
import CreatableSelect from './lib/CreatableReactSelect';

// Types

// Props
import creatableReactSelectProps from './creatable-select.props';

export default ({   
  type, 
  value,
  uiSchema = {},
  schema = { parsedArray: false } as JSONSchema7 & { parsedArray?: boolean },
  disabled,
  options = {},
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
    htmlid,
    nullOption, 
    optionsOnly,
    isClearable,
  } = creatableReactSelectProps({ 
    onChange,
    schema,
    uiSchema,
    options,
    type, 
    widget,
    schemaVersion,
  });
  const optionValues = (choices && typeof choices === 'object' && choices.length) ? choices.map((suggestion) => ({
    value: suggestion.key,
    label: suggestion.value,
  })) : [];
  
  let newVal = value;

  try {
    if (String(schemaVersion) === '2') {
      newVal = !isEmpty(value) ? JSON.parse(value) : [];
    }
    else {
      const backwardsCompatibleFormat = (givenValue) => givenValue
        .some((t) => typeof t === 'object' && 'value' in t);
      const parseMultiSelectValues = (givenValue) => {
        const parsedValue = schema.parsedArray ? givenValue : JSON.parse(givenValue);
        const isBackwardsCompatibleFormat = backwardsCompatibleFormat(parsedValue);
        if (isBackwardsCompatibleFormat) {
          const finalValues = values(mapValues(parsedValue, 'value'));
          return optionValues.filter((sg) => finalValues.includes(sg.value));
        }
        return optionValues.filter((sg) => parsedValue.includes(sg.value));
      };
      newVal = parseMultiSelectValues(value);
    }
  }
  catch (err) {
    newVal = value;
  }

  return (
    <CreatableSelect 
      value={newVal}
      onChange={givenOnChange}
      htmlid={htmlid}
      options={optionValues}
      isDisabled={disabled}
      optionsOnly={optionsOnly}
      uiSchema={uiSchema}
      label={label}
      restProps={options}
    />
  );
};
