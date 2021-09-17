// Library
import React, { useState } from 'react';
import { TextField } from '@mui/material';

const CustomComponent = ({ onChange, formData }) => {
  const [data, setData] = useState(formData.customComponent || '');
  return (
      <TextField
        id='standard-basic'
        label='Custom Text'
        value={data}
        onChange={(e) => setData(e.target.value)}
        onBlur={(e) => onChange(e.target.value)}
      />
  );
};

export default CustomComponent;
