import size from 'lodash/size';

export default (schema, value) => {
  if ((schema.minLength !== undefined) && (size(value) < schema.minLength)) {
    return ({ message: `'${schema.title}' must be at least ${schema.minLength}` });
  }
  return null;
};
