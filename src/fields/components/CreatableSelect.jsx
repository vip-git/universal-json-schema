import React from 'react';
import CreatableSelect from './lib/CreatableReactSelect';

export default ({ type, value, label, htmlId, onChange, ...rest }) => (
    <CreatableSelect 
      value={(value) ? JSON.parse(value) : []}
      onChange={onChange}
      htmlId={htmlId}
      label={label}
    />
);
