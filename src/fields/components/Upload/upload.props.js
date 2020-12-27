const onChangeHandler = (onChange) => (givenValue) => {
  const value = typeof givenValue === 'string' ? givenValue : String(givenValue);
  if (value !== undefined) onChange(value);
};

export default ({ onChange, schema = {}, widget, uiSchema = {} }) => ({
  onChange: onChange && onChangeHandler(onChange),
  label: schema.title,
  buttonType: widget || 'outlined',
  acceptValues: uiSchema['ui:accept'] || '*',
  isMulti: uiSchema['ui:isMulti'] || false,
  buttonIcon: uiSchema['ui:icon'] || 'add_circle',
  buttonTitle: uiSchema['ui:buttonTitle'] || 'Upload',
});
