import React from 'react';
import CreatableSelect from './lib/CreatableReactSelect';

export default ({ type, value, label, onChange, ...rest }) => (
    <CreatableSelect 
      value={(value) ? JSON.parse(value) : []}
      onChange={onChange} 
      label={label}
    />
);
