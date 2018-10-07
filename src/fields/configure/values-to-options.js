import keys from 'lodash/keys';

export default (values) => {
  if (values instanceof Array) {
    return values.map((e) => {
      return (typeof e === 'object') ? ({ key: e.key, value: e.value }) : ({ key: e, value: e });
    });
  }
  if (typeof values === 'object') {
    return keys(values).map(e => ({ key: e, value: values[e] }));
  }
  return [{}];
};
