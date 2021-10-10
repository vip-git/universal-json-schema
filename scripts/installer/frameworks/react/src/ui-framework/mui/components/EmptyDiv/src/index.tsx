// Library
import React from 'react';

export default ({
  type,
  value,
  schema = {},
  uiSchema = {},
  options = {},
  onChange,
  isKeyField,
  htmlid,
  onBlur,
}: any) => (
    <div id={htmlid} {...options}>
        {schema.title}
        {value}
    </div>
);
