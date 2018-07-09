export default (schema, value) => {
  if (schema.minimum && typeof value === 'number' && value < schema.minimum) {
    return ({ message: `'${schema.title}' should be >= ${schema.minimum}` });
  }
  return null;
};
