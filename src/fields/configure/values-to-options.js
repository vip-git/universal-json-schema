import keys from 'lodash/keys';

export default (values) => {
  if (values instanceof Array) {
    return values.map((e) => (typeof e === 'object'
      ? { key: e.key, value: e.value, disabled: e.disabled, style: e.style }
      : { key: e, value: e, disabled: e.disabled, style: e.style }));
  }
  if (typeof values === 'object') {
    return keys(values).map((e) => ({ key: e, value: values[e] }));
  }
  return [{}];
};
