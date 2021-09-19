// Library
import React from 'react';
import TextField from '@mui/material/TextField';
import pickerProps, { renderPickerComp } from './picker.props';

export default ({
  path, 
  label, 
  title, 
  value, 
  options = {}, 
  htmlid, 
  type, 
  uiSchema = {}, 
  onChange, 
  ...rest
}) => {
  const pickerType = uiSchema['ui:props']?.variant || uiSchema['ui:widget'] || type;
  const { PickerComp, placeholder, format } = renderPickerComp(pickerType);
  return (
        <div
          id={htmlid}
          key={`material-date-picker-${label}`}
          className='material-form-datepicker'
          style={{ 
            'display': 'contents',
          }}
        >
            <PickerComp
                mask={placeholder}
                label={label}
                value={(value === undefined) ? null : value}
                maxDate={'2200-01-01'}
                renderInput={(params) => <TextField {...params} value={(value === undefined) ? null : value} />}
                {...pickerProps({ onChange })}
                {...options}
            />
        </div>
  );
};
