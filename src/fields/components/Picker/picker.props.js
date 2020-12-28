const onChangeHandler = (onChange) => (val) => {
  const value = val && val.format && val.format();
  if (value !== 'undefined') onChange(value === 'Invalid date' ? val : value);
};

export default ({ onChange }) => ({
  onChange: onChange && onChangeHandler(onChange),
});
