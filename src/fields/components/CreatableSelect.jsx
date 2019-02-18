import React from 'react';
import CreatableSelect from './lib/CreatableReactSelect';

export default ({ type, value, label, htmlid, onChange, options, ...rest }) => {
  const optionValues = options.map(suggestion => ({
    value: suggestion.key,
    label: suggestion.value,
  }));
  return (
    <CreatableSelect 
      value={(value) ? JSON.parse(value) : []}
      onChange={onChange}
      htmlid={htmlid}
      options={optionValues}
      label={label}
    />
  );
};
