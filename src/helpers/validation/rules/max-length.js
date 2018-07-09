import size from 'lodash/size';

export default (schema, value) => {
  if (schema.maxLength && size(value) > schema.maxLength) {
    return ({ message: `'${value}' exceeds the maximum length of ${schema.maxLength} for field '${schema.title}'` });
  }
  return null;
};
