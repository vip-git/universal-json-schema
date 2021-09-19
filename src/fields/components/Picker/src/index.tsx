// Library
import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import EventIcon from '@mui/icons-material/Event';
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
  const [open, setOpen] = React.useState(false)
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
                toolbarTitle={label}
                value={typeof value === 'undefined' ? null : value}
                inputFormat={format}
                open={open}
                onClose={() => setOpen(false)}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    style={{ width: '100%'}}
                    onClick={() => setOpen(true)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='date'
                            onClick={() => setOpen(true)}
                          >
                            <EventIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
                {...pickerProps({ onChange })}
                {...options}
            />
        </div>
  );
};
