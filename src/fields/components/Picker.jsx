import React from "react";
import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  KeyboardTimePicker,
  DatePicker,
  TimePicker,
  DateTimePicker
} from "@material-ui/pickers";

const renderPickerComp = type => {
  switch (type) {
    case "material-date":
      return {
        PickerComp: KeyboardDatePicker,
        maskInput: [/\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
        format: "DD-MM-YYYY",
        placeholder: "__-__-____"
      };
    case "material-date-keyboard-disable":
      return {
        PickerComp: DatePicker,
        maskInput: [/\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
        format: "DD-MM-YYYY",
        placeholder: "__-__-____"
      };
    case "material-time-keyboard-disable":
      return {
        PickerComp: TimePicker,
        maskInput: [/\d/, /\d/, ":", /\d/, /\d/, " ", /a|p/i, "M"],
        format: "hh:mm A",
        placeholder: "__:__ __"
      };
    case "material-time":
      return {
        PickerComp: KeyboardTimePicker,
        maskInput: [/\d/, /\d/, ":", /\d/, /\d/, " ", /a|p/i, "M"],
        format: "hh:mm A",
        placeholder: "__:__ __"
      };
    case "material-datetime":
      return {
        PickerComp: KeyboardDateTimePicker,
        maskInput: [
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          " ",
          /\d/,
          /\d/,
          ":",
          /\d/,
          /\d/,
          " ",
          /a|p/i,
          "M"
        ],
        format: "DD-MM-YYYY hh:mm A",
        placeholder: "__-__-___ __:__ __"
      };
    case "material-datetime-keyboard-disable":
      return {
        PickerComp: DateTimePicker,
        maskInput: [
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          " ",
          /\d/,
          /\d/,
          ":",
          /\d/,
          /\d/,
          " ",
          /a|p/i,
          "M"
        ],
        format: "DD-MM-YYYY hh:mm A",
        placeholder: "__-__-___ __:__ __"
      };
    default:
      return DatePicker;
  }
};

export default ({
  path,
  label,
  title,
  value,
  htmlid,
  type,
  onChange,
  ...rest
}) => {
  const { PickerComp, maskInput, placeholder, format } = renderPickerComp(type);
  return (
    <div
      id={htmlid}
      key={`material-date-picker-${label}`}
      className="material-form-datepicker"
      style={{
        display: "contents",
        "&>div": {
          flexBasis: "100%"
        }
      }}
    >
      <PickerComp
        keyboard
        format={format}
        style={{ flexBasis: "100%" }}
        placeholder={placeholder}
        label={label}
        // handle clearing outside => pass plain array if you are not controlling value outside
        mask={val => (val ? maskInput : [])}
        value={!value ? null : value}
        onChange={onChange}
        maxDate={"2200-01-01"}
        disableOpenOnEnter
        animateYearScrolling={false}
      />
    </div>
  );
};
