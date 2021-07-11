import React from 'react';
import MaterialUploadButton from './lib';
import uploadProps, { UploadProps } from './upload.props';

export default ({ 
  onChange,
  schema = {},
  widget,
  uiSchema = {},
  htmlid,
  ...rest
}: UploadProps) => (
   <MaterialUploadButton 
        htmlid={htmlid} 
        {...rest}
        {...uploadProps({ onChange, schema, widget, uiSchema })}
   />
);
