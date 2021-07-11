import React from 'react';
import MaterialUploadButton from './lib';
import uploadProps from './upload.props';

export default ({ 
  onChange,
  schema = {},
  widget = null,
  uiSchema = {},
  htmlid,
  ...rest
}) => (
   <MaterialUploadButton 
        htmlid={htmlid} 
        {...rest}
        {...uploadProps({ onChange, schema, widget, uiSchema })}
   />
);
