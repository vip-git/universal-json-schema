export default (type, uiSchema) => {
  const widget = uiSchema['ui:widget'];
  if (widget === 'updown') {
    return 'number';
  }
  if (type === 'number') {
    return 'float';
  }
  if (type === 'integer') {
    return 'integer';
  }
  if (widget === 'password') {
    return 'password';
  }
  return type;
};
