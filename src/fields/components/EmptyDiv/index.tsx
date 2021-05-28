// Library
import React from 'react';

const EmptyDiv = ({
  type,
  value,
  schema = {} as any,
  uiSchema = {},
  options = {},
  onChange,
  isKeyField,
  htmlid,
  onBlur,
}) => (
    <div id={htmlid} {...options}>
        {schema.title}
        {value}
    </div>
);

export default EmptyDiv;
