/* eslint-disable */
import size from 'lodash/size';
export default (schema, value) => {
  if (schema.pattern && value && !RegExp(schema.pattern).test(value)) {
    return ({ message: `'${schema.title}' must ma tch pattern ${schema.pattern}` });
  }
  return null;
};
