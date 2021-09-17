// Library
import React from 'react';

// Material UI
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/lab/Autocomplete';

// Props
import materialSelectProps, { AutoSelectProps } from './auto-complete.props';

export default ({ 
  type,
  value = '',
  schema,
  disabled = false,
  onChange,
  htmlid,
  xhrSchema = {},
  options = {},
  title,
  ...rest 
}: AutoSelectProps) => {
  const isMultiple = (options.multiple || schema.parsedArray || (schema.anyOf && schema.parsedArray)) && !schema.oneOf;

  const {
    onChange: givenOnChange,
    choices,
  } = materialSelectProps({ 
    onChange,
    schema,
    type,
    isMultiple,
  });

  const groupBy = (option) => option[options && options.groupBy];
  const getOptionDisabled = (option) => options && options.disabledOptions && options.disabledOptions.includes(option);

  return isMultiple ? (
    <Autocomplete
        multiple
        options={choices}
        groupBy={groupBy}
        getOptionDisabled={getOptionDisabled}
        getOptionLabel={(option: string) => option}
        defaultValue={Array.isArray(value) ? value : []}
        renderInput={(params) => (
          <TextField label={title} {...params} />
        )}
        onChange={givenOnChange}
    />
  ) : (
    <Autocomplete
      {...options}
      id={htmlid}
      options={choices}
      groupBy={groupBy}
      getOptionDisabled={getOptionDisabled}
      value={value && String(value)}
      getOptionLabel={(option: string) => option && String(option)}
      getOptionSelected={(val) => val && String(val)}
      renderInput={(params) => <TextField {...params} label={title} value={value && String(value)} />}
      onChange={givenOnChange}
    />
  );
};
