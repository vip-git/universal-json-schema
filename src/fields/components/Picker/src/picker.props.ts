const onChangeHandler = (onChange) => (val) => {
  const value = val && val.format && val.format();
  onChange(
    value === 'Invalid date' ? '' : value,
    // eslint-disable-next-line no-underscore-dangle
    value === 'Invalid date' ? val._i : value,
    value !== 'Invalid date',
  );
};

export default ({ onChange }) => ({
  onChange: onChange && onChangeHandler(onChange),
});
