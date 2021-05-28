const onChangeHandler = (onChange) => (givenValue) => {
  const value = typeof givenValue === 'string' ? givenValue : String(givenValue);
  if (value !== undefined) onChange(value);
};

export default ({ onChange, schema = {} as any, widget, uiSchema = {} }) => {
  const commonReturn = {
    onChange: onChange && onChangeHandler(onChange),
    label: schema.title,
  };
  if (uiSchema['ui:props'] || uiSchema['ui:options']) {
    const props = uiSchema['ui:props'] || uiSchema['ui:options'];
    const { variant, accept, isMulti, icon, buttonTitle } = props;
    return {
      ...commonReturn,
      buttonType: variant || 'outlined',
      acceptValues: accept || '*',
      isMulti: isMulti || false,
      buttonIcon: icon || 'add_circle',
      buttonTitle: buttonTitle || 'Upload',
    };
  }

  return {
    ...commonReturn,
    buttonType: widget || 'outlined',
    acceptValues: uiSchema['ui:accept'] || '*',
    isMulti: uiSchema['ui:isMulti'] || false,
    buttonIcon: uiSchema['ui:icon'] || 'add_circle',
    buttonTitle: uiSchema['ui:buttonTitle'] || 'Upload',
  };
};
