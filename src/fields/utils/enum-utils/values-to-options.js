import keys from 'lodash/keys';

export default (values) => {
  if (values instanceof Array) {
    return values.map((e) => {
      const returnValue = typeof e === 'object' ? { ...e } : { key: e, value: e };
      return returnValue;
    });
  }
  if (typeof values === 'object') {
    return keys(values).map((e) => ({ key: e, value: values[e] }));
  }
  return [];
};
