import React from 'react';
import CreatableSelect from './lib/CreatableReactSelect';

export default ({ type, value, label, htmlid, onChange, options, disabled, optionsOnly, ...rest }) => {
  const optionValues = (options && typeof options === 'object' && options.length) ? options.map(suggestion => ({
    value: suggestion.key,
    label: suggestion.value,
  })) : [];
  return (
    <CreatableSelect 
      value={(value) ? JSON.parse(value) : []}
      onChange={onChange}
      htmlid={htmlid}
      options={optionValues}
      isDisabled={disabled}
      optionsOnly={optionsOnly || false}
      label={label}
    />
  );
};
