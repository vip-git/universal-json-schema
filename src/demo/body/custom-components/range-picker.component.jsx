/* eslint-disable react/jsx-fragments */
// Library
import React from 'react';
import { DateRangePicker } from 'materialui-daterange-picker';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import { TextField } from '@material-ui/core';

const CustomDateRangePicker = ({ onChange, formData, uiData = {} }) => {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState({});
  const [data, setData] = React.useState(uiData.customComponent || formData.customComponent || '');
    
  const toggle = () => setOpen(!open);

  const RangePicker = () => (
    <Dialog
        open={open}
        onClose={toggle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        PaperProps={{
          style: {
            maxWidth: 585,
            overflow: 'hidden',
          },
        }}
    >
      <DateRangePicker
        open={open}
        toggle={toggle}
        onChange={(range) => {
          const startDate = range.startDate.toISOString();
          const endDate = range.endDate.toISOString();
          const newUIData = `${range.startDate.toLocaleDateString()} - ${range.endDate.toLocaleDateString()}`;
          const newData = {
            startDate,
            endDate,
          };
          onChange(newData, newUIData);
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
