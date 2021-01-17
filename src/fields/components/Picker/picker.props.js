/* eslint-disable no-underscore-dangle */
const onChangeHandler = (onChange) => (val) => {
  const value = val && val.format && val.format();
  onChange(
    value === 'Invalid date' ? '' : value,
    value === 'Invalid date' ? val._i : value,
    value !== 'Invalid date',
  );
};

export default ({ onChange }) => ({
  onChange: onChange && onChangeHandler(onChange),
});
