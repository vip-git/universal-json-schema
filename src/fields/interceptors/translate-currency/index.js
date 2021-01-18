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

const translateCurrency = ({
  value,
  options,
}) => {
  const formData = Number(parseCurrencyValue(value, options.useLocaleString));
  const uiData = Number(
    parseCurrencyValue(value, options.useLocaleString),
  ).toLocaleString(options.useLocaleString);
  return {
    formData,
    uiData,
  };
};

export default translateCurrency;
