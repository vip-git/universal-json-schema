// Library
import React from 'react';
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
                format={format}
                style={{ flexBasis: '100%' }}
                placeholder={placeholder}
                label={label}
                value={(value === undefined) ? null : value}
                maxDate={'2200-01-01'}
                animateYearScrolling={false}
                {...pickerProps({ onChange })}
                {...options}
            />
        </div>
  );
};
