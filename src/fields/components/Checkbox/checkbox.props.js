// Library
import without from 'lodash/without';

const doOnChange = (onChange) => (e, checked) => onChange(checked);

const onCheckboxChangeHandler = (onChange, title) => (e) => {
  const spec = {};
  if (e) {
    spec.$push = [title];
  }
  else {
    spec.$apply = (arr) => without(arr, title);
  }
  return onChange(spec);
};

export default ({ onChange, schema = {} }) => ({
  onChange: doOnChange(onChange),
  onGroupChange: onChange
      && onCheckboxChangeHandler(onChange, schema.title),
  label: schema.title,
});
