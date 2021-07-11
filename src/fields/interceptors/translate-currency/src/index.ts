// Library
import isEmpty from 'lodash/isEmpty';
import { TranslateCurrencyProps, ReturnType } from './index.type';

const isEmptyValues = (value) => isEmpty(value) && typeof value !== 'number' && typeof value !== 'boolean';

const getDecimalSeparator = (locale) => {
  const numberWithDecimalSeparator = 1.1;
  return Intl.NumberFormat(locale)
    .formatToParts(numberWithDecimalSeparator)
    .find((part) => part.type === 'decimal').value;
};

const isScientificNotation = (numberString) => String(numberString).toUpperCase().includes('E');

const parseCurrencyValue = (value, useLocaleString) => {
  if (getDecimalSeparator(useLocaleString) === ',') {
    const whatDecimalSeparatorRegex = /[^\d,]/g;
    return value
      .replace(whatDecimalSeparatorRegex, '')
      .replace(/\./g, '')
      .replace(/,/g, '.');
  }

  const whatDecimalSeparatorRegex = /[^\d.]/g;
  return value.replace(whatDecimalSeparatorRegex, '');
};

const translateCurrency = ({ value, options }: TranslateCurrencyProps): ReturnType => {
  // eslint-disable-next-line no-undef
  const locale = options?.useLocaleString || window?.navigator?.language;
  if (isEmptyValues(value)) {
    return {
      formData: '',
      uiData: '',
    };
  }
  const formData = Number(parseCurrencyValue(String(value), locale));
  const lastChar = String(value).charAt(String(value).length - 1);
  const uiData = lastChar === getDecimalSeparator(locale)
    ? String(value)
    : Number(parseCurrencyValue(String(value), locale)).toLocaleString(
      locale,
    );

  return {
    formData: isScientificNotation(formData)
      ? formData.toLocaleString('fullwide', { useGrouping: false })
      : formData,
    uiData,
  };
};

export default translateCurrency;
