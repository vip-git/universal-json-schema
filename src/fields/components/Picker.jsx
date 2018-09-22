import React from 'react';
import DatePicker from 'material-ui-pickers/DatePicker';
import TimePicker from 'material-ui-pickers/TimePicker';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

const doOnChange = onChange => (e, checked) => onChange(checked);

const renderPickerComp = (type) => {
    switch (type) {
        case 'material-date':
            return {
                comp: DatePicker,
                maskInput: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
                format: "DD-MM-YYYY",
                placeholder: "10-10-2018"
            }
        case 'material-time':
            return {
                comp: TimePicker,
                maskInput: [/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M'],
                format: "hh:mm A",
                placeholder: "08:00 AM"
            }
        case 'material-datetime':
            return {
                comp: DateTimePicker,
                maskInput: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M'],
                format: "DD-MM-YYYY hh:mm A",
                placeholder: "10/10/2018 08:00 AM"
            }
        default:
            return DatePicker;
    }
}

export default ({ path, label, title, value, type, onChange, ...rest }) => {
    const PickerComp = renderPickerComp(type).comp;
    const maskedInput = renderPickerComp(type).maskInput;
    const placeholder = renderPickerComp(type).placeholder;
    const format = renderPickerComp(type).format;
    return (
        <div class="material-form-datepicker" style={{ display: 'contents' }}>
            <PickerComp
                keyboard
                format={format}
                placeholder={placeholder}
                label={label}
                // handle clearing outside => pass plain array if you are not controlling value outside
                mask={value => (value ? maskedInput : [])}
                value={value}
                onChange={onChange}
                disableOpenOnEnter
                animateYearScrolling={false}
            />
        </div>
)
};
