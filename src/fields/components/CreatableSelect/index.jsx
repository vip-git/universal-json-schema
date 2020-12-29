import React from 'react';
import { isEmpty } from 'lodash';
import CreatableSelect from './lib/CreatableReactSelect';

// Props
import creatableReactSelectProps from './creatable-select.props';

export default ({   
  type, 
  value,
  uiSchema,
  schema,
  disabled,
  options,
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
  });
  const optionValues = (choices && typeof choices === 'object' && choices.length) ? choices.map((suggestion) => ({
    value: suggestion.key,
    label: suggestion.value,
  })) : [];
  return (
    <CreatableSelect 
      value={!isEmpty(value) ? JSON.parse(value) : []}
      onChange={givenOnChange}
      htmlid={htmlid}
      options={optionValues}
      isDisabled={disabled}
      optionsOnly={optionsOnly}
      label={label}
    />
  );
};
