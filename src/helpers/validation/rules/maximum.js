export default (schema, value) => {
  if (schema.maximum && typeof value === 'number' && value > schema.maximum) {
    return ({ message: `'${schema.title}' should be <= ${schema.maximum}` });
  }
  return null;
};
