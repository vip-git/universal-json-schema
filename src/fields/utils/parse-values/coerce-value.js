const toNumber = (v, options = false) => {
  const returns = { v };
  if (returns.v === '' || returns.v === undefined) return returns.v;
  const n = Number(returns.v);
  return !Number.isNaN(n) ? n : returns.v;
};

export default (type, value, options = false) => {
  switch (type) {
    case 'string':
      return typeof value === 'string' ? value : String(value);
    case 'number':
    case 'integer':
    case 'double':
    case 'float':
    case 'decimal':
      return toNumber(value, options);
    case 'boolean':
      return typeof value === 'boolean' ? value : (value === 'true');
    default:
      return value;
  }
};
