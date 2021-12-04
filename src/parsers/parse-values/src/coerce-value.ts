const toNumber = (v, options = false as any) => {
  const getDecimalSeparator = (locale) => {
    const numberWithDecimalSeparator = 1.1;
    return Intl.NumberFormat(locale)
      .formatToParts(numberWithDecimalSeparator)
      .find((part) => part.type === 'decimal').value;
  };
  const getRightSeperator = (locale) => (getDecimalSeparator(locale) === '.' ? ',' : '.');
  const thousandSeparator = options.useLocaleString
    ? getRightSeperator(options.useLocaleString)
    : '.';
  const decimalSeparator = options.useLocaleString
    ? getDecimalSeparator(options.useLocaleString)
    : '.';
  const thRegex = thousandSeparator === '.' ? /[.]/g : /[,]/g;
  const decimalRegex = decimalSeparator === '.' ? /[.]/g : /[,]/g;
  const returns = { v };
  const countDots = (num) => !Number.isNaN(Number(num)) && (num?.match(thRegex) || [])?.length;
  const countDecimals = (num) => num && (decimalRegex.exec(String(num)) || [])?.length;
  if (
    returns.v === ''
    || returns.v === undefined
    || (returns.v?.slice(-1) === thousandSeparator
      && String(countDots(returns.v)) !== 'false'
      && countDots(returns.v) <= 1)
  ) {
    return returns.v;
  }
  const n = returns.v.includes(thousandSeparator)
    && returns.v?.slice(-1) === '0'
    && !options.isFormData
    ? returns.v
    : Number(returns.v);
  const digitsMatch = thousandSeparator === '.'
    ? returns.v.match(/[0-9.]*/g)
    : returns.v.match(/[0-9,]*/g);
  const backupN = Number(digitsMatch && digitsMatch.length && digitsMatch[0]);
  let t = 0;
  const replaceNum = Number.isNaN(backupN)
    ? returns.v.replace(thRegex, (match) => {
      if (match.includes(thousandSeparator)) {
        t++;
      }
      const finalVal = t !== 1 && match === thousandSeparator ? '' : match;
      return finalVal;
    })
    : backupN;
  try {
    const isFloat = (nim) => Number(nim) === nim && nim % 1 !== 0;
    const returnNum = !Number.isNaN(n) ? n : replaceNum;
    const finalNum = (num, returnedNum) => (!Number.isNaN(Number(num)) ? num : returnedNum);
    const returnValue = Number.isSafeInteger(returnNum) || isFloat(returnNum)
      ? returnNum
      : finalNum(String(returns.v), returnNum);
    const lastChar = returns.v.charAt(returns.v.length - 1);
    const stripDot = (vald) => (countDecimals(vald) > 1 ? vald.slice(0, vald.length - 1) : vald);
    const localeNum = decimalSeparator === '.' ? Number(returnValue) : returnValue;
    const dottedNumber = lastChar === decimalSeparator ? stripDot(returns.v) : localeNum;
    const rightNumber = Number.isNaN(Number(returnValue)) && lastChar !== decimalSeparator
      ? returnValue
      : dottedNumber;
    const strippedRightNumber = countDecimals(rightNumber) > 1
      ? rightNumber.replace(decimalSeparator, '')
      : rightNumber;
    return Number(returnNum).toString().includes('e')
      ? returnValue
      : strippedRightNumber;
  }
  catch (err) {
    return returns.v;
  }
};

export default (type, value, options?: { useLocaleString: string }) => {
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
      return typeof value === 'boolean' ? value : value === 'true';
    default:
      return value;
  }
};
