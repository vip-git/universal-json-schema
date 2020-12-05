/* eslint-disable react/jsx-fragments */
// Library
import React from 'react';
import { DateRangePicker } from 'materialui-daterange-picker';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import { TextField } from '@material-ui/core';

const CustomDateRangePicker = ({ onChange, formData }) => {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState({});
  const [data, setData] = React.useState(formData.customComponent || '');

  const toggle = () => setOpen(!open);

  const RangePicker = () => (
    <Dialog
        open={open}
        onClose={toggle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
    >
      <DateRangePicker
        open={open}
        toggle={toggle}
        onChange={(range) => {
          const customData = `${range.startDate.toDateString()} - ${range.endDate.toDateString()}`;
          onChange(customData);
          toggle();
        }}
      />
    </Dialog>
  );

  return (
    <React.Fragment>
      <TextField
        id='standard-basic'
        label='Range Picker'
        value={data}
        onClick={toggle}
      />
      <RangePicker />
    </React.Fragment>
  );
};

export default CustomDateRangePicker;
