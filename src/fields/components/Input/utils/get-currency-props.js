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

export default ({ onChange, options }) => {
  if (options.useLocaleString) {
    return {
      onBlur: (event) => {
        const { value } = event.target;
        return (
          value
          && onChange(
            Number(
              parseCurrencyValue(value, options.useLocaleString),
            ).toLocaleString(options.useLocaleString),
          )
        );
      },
    };
  }
  return {};
};
