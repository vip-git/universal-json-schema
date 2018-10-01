import React from 'react';
import CreatableSelect from './lib/CreatableReactSelect';

export default ({ type, value = '[]', options, label, nullOption, onChange, ...rest }) => {
  value = (value) ? JSON.parse(value) : [];
  return (
    <CreatableSelect value={value}  
                          onChange={onChange} 
                          label={label} />
  );
};
