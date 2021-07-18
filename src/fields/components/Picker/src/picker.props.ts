// Library
import { 
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  KeyboardTimePicker, 
  DatePicker, 
  TimePicker, 
  DateTimePicker, 
} from '@material-ui/pickers';

export const renderPickerComp = (type) => {
  switch (type) {
    case 'material-date':
      return {
        PickerComp: KeyboardDatePicker,
        maskInput: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        format: 'DD-MM-YYYY',
        placeholder: '__-__-____',
      };
    case 'material-date-keyboard-disable':
      return {
        PickerComp: DatePicker,
        maskInput: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        format: 'DD-MM-YYYY',
        placeholder: '__-__-____',
      };
    case 'material-time-keyboard-disable':
      return {
        PickerComp: TimePicker,
        maskInput: [/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M'],
        format: 'hh:mm A',
        placeholder: '__:__ __',
      };
    case 'material-time':
      return {
        PickerComp: KeyboardTimePicker,
        maskInput: [/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M'],
        format: 'hh:mm A',
        placeholder: '__:__ __',
      };
    case 'material-datetime':
      return {
        PickerComp: KeyboardDateTimePicker,
        maskInput: [
          /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 
          'M',
        ],
        format: 'DD-MM-YYYY hh:mm A',
        placeholder: '__-__-___ __:__ __',
      }; 
    case 'material-datetime-keyboard-disable':
      return {
        PickerComp: DateTimePicker,
        maskInput: [
          /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 
          'M',
        ],
        format: 'DD-MM-YYYY hh:mm A',
        placeholder: '__-__-___ __:__ __',
      };
    default:
      return {
        PickerComp: KeyboardDatePicker,
        maskInput: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        format: 'DD-MM-YYYY',
        placeholder: '__-__-____',
      };
  }
};

const onChangeHandler = (onChange) => (val) => {
  const value = val && val.format && val.format();
  onChange(
    value === 'Invalid date' ? '' : value,
    // eslint-disable-next-line no-underscore-dangle
    value === 'Invalid date' ? val._i : value,
    value !== 'Invalid date',
  );
};

export default ({ onChange }) => ({
  onChange: onChange && onChangeHandler(onChange),
});
