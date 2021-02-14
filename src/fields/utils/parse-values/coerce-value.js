const toNumber = (v, options = false) => {
  const returns = { v };
  const countDots = (num) => !Number.isNaN(Number(num)) && (num?.match(/[.]/g) || [])?.length;
  if (
    returns.v === ''
    || returns.v === undefined
    || (returns.v?.slice(-1) === '.'
      && !options.isFormData
      && String(countDots(returns.v)) !== 'false'
      && countDots(returns.v) <= 1)
  ) {
    return returns.v;
  }
  const n = returns.v.includes('.')
    && returns.v?.slice(-1) === '0'
    && !options.isFormData
    ? returns.v
    : Number(returns.v);
  const digitsMatch = returns.v.match(/[0-9.]*/g);
  const backupN = Number(digitsMatch && digitsMatch.length && digitsMatch[0]);
  let t = 0;
  const replaceNum = Number.isNaN(backupN)
    ? returns.v.replace(/[.]/g, (match) => {
      if (match.includes('.')) {
        t++;
      }
      const finalVal = t !== 1 && match === '.' ? '' : match;
      return finalVal;
    })
    : backupN;
  try {
    const isFloat = (nim) => Number(nim) === nim && nim % 1 !== 0;
    const returnNum = !Number.isNaN(n) ? n : replaceNum;
    const finalNum = (num, returnedNum) => (!Number.isNaN(Number(num)) ? num : returnedNum);
    return Number.isSafeInteger(returnNum) || isFloat(returnNum)
      ? returnNum
      : finalNum(String(returns.v), returnNum);
  }
  catch (err) {
    return returns.v;
  }
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
      return typeof value === 'boolean' ? value : value === 'true';
    default:
      return value;
  }
};
