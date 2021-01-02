const toNumber = (v, options = false) => {
  if (v === '' || v === undefined) return v;
  if (options && options.useLocaleString) return v.replace(/[^\d,.]/g, '');
  const n = Number(v);
  return !Number.isNaN(n) ? n : v;
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
    default:
      return value;
  }
};
