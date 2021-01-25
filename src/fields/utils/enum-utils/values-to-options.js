import keys from 'lodash/keys';

export default (values) => {
  if (values instanceof Array) {
    const returnValueMapping = (value) => {
      if ('const' in value) {
        return { key: value.const, value: value.title };
      }
      return { ...value };
    };
    return values.map((e) => {
      const returnValue =
        typeof e === 'object' ? returnValueMapping(e) : { key: e, value: e };
      return returnValue;
    });
  }
  if (typeof values === 'object') {
    return keys(values).map((e) => ({ key: e, value: values[e] }));
  }
  return [];
};
