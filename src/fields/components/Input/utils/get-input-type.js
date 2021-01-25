export default (type, uiSchema) => {
  const widget = uiSchema['ui:widget'];
  if (type === 'number' || type === 'integer') {
    if (widget === 'updown') {
      return 'number';
    }
    return 'text';
  }
  if (widget === 'password') {
    return 'password';
  }
  return type;
};
