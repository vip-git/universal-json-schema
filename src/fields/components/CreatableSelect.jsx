import React from 'react';
import CreatableSelect from './lib/CreatableReactSelect';

export default ({ type, value, creatableSelectValue, inputValue, options, label, nullOption, onChange, onKeyDown, onInputChange, ...rest }) => {
  console.log('value is', creatableSelectValue);
  const newVal = (creatableSelectValue) ? JSON.parse(creatableSelectValue) : [];
  console.log('onChange is', onChange);
  return (
    <CreatableSelect 
      value={newVal}
      inputValue={inputValue}
      onChange={onChange} 
      onKeyDown={onKeyDown}
      onInputChange={onInputChange}
      label={label}
    />
  );
};
