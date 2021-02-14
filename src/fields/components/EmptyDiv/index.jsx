// Library
import React from 'react';

export default ({
  type,
  value,
  uiSchema = {},
  options = {},
  onChange,
  isKeyField,
  htmlid,
  onBlur,
}) => (
    <div id={htmlid} {...options}>
        {value}
    </div>
);
