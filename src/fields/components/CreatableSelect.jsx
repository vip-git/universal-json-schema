import React from 'react';
import CreatableSelect from './lib/CreatableReactSelect';

export default ({ type, value, label, htmlid, onChange, options, optionsOnly, ...rest }) => {
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
      optionsOnly={optionsOnly || false}
      label={label}
    />
  );
};
