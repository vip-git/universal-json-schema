// Library
import isEmpty from 'lodash/isEmpty';

const isEmptyValues = (value) => isEmpty(value) && typeof value !== 'number' && typeof value !== 'boolean';

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

const translateCurrency = ({ value, options }) => {
  if (isEmptyValues(value)) {
    return {
      formData: '',
      uiData: '',
    };
  }
  const formData = Number(
    parseCurrencyValue(String(value), options.useLocaleString),
  );
  const uiData = Number(
    parseCurrencyValue(String(value), options.useLocaleString),
  ).toLocaleString(options.useLocaleString);
  return {
    formData,
    uiData,
  };
};

export default translateCurrency;
