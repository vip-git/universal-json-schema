import React from 'react';
import CreatableSelect from './lib/CreatableReactSelect';

export default ({ type, value, creatableSelectValue, inputValue, options, label, nullOption, onChange, onKeyDown, onInputChange, ...rest }) => {
  console.log('value is', creatableSelectValue);
  let newVal = (creatableSelectValue) ? JSON.parse(creatableSelectValue) : [];
  let newInputVal = inputValue;
  console.log('onChange is', onChange);

  const createOption = label => ({
    label,
    value: label,
  });

  const handleCreatableSelectKeyDown = (event) => {
    if (!newInputVal) return;
    const finalVal = (value) ? [...JSON.parse(value), createOption(newInputVal)] : [createOption(newInputVal)];
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group('Value Added');
        console.log(finalVal);
        console.groupEnd();
        newVal = finalVal;
        newInputVal = '';
        event.preventDefault();
        break;
      default:
        break;
    }
  };
  return (
    <CreatableSelect 
      value={newVal}
      inputValue={newInputVal}
      onChange={onChange} 
      onKeyDown={handleCreatableSelectKeyDown}
      onInputChange={onInputChange}
      label={label}
    />
  );
};
