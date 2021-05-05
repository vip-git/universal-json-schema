// Library
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// Props
import materialSelectProps from './select.props';

type Props = {
  type: any;
  value: any;
  schema: any;
  disabled: any;
  onChange: any;
  htmlid: any;
  xhrSchema: any;
  options: any;
  [key: string]: any;
}

export default ({ 
  type, 
  value = '',
  schema,
  disabled,
  onChange, 
  htmlid,
  xhrSchema,
  options = {},
  ...rest 
}: Props) => {
  const isMultiple = (options.multiple || (schema.anyOf && schema.parsedArray)) && !schema.oneOf;

  const { 
    onChange: givenOnChange,
    choices,
    label,  
    nullOption, 
  } = materialSelectProps({ 
    onChange,
    schema,
    type,
    isMultiple,
  });

  const parseMultiSelectValue = (givenValue) => (Array.isArray(givenValue) ? givenValue : [givenValue]);
  return (
    <Select
      {...options}
      id={htmlid}
      value={isMultiple ? parseMultiSelectValue(value) : String(value)}
      onChange={givenOnChange}
      multiple={isMultiple}
    >
      {choices.map((o) => <MenuItem key={o.key} value={String(o.key)}>{String(o.value)}</MenuItem>)}
    </Select>
  );
};
