const parseCurrencyValue = (value, useLocaleString) => {
  let n = 1.1;
  n = n.toLocaleString(useLocaleString).substring(1, 2);
  const whatDecimalSeparatorRegex = n === '.' ? /[^\d]/g : /[^\d,.]/g;
  return n === '.'
    ? value.replace(whatDecimalSeparatorRegex, '')
    : value
      .replace(whatDecimalSeparatorRegex, '')
      .replace(/\./g, '')
      .replace(/,/g, '.');
};

const toNumber = (v, options = false) => {
  const returns = { v };
  if (returns.v === '' || returns.v === undefined) return returns.v;
  if (options && options.useLocaleString) {
    return options.isFormData
      ? Number(parseCurrencyValue(returns.v, options.useLocaleString))
      : Number(
        parseCurrencyValue(returns.v, options.useLocaleString),
      ).toLocaleString(options.useLocaleString);
  }
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
