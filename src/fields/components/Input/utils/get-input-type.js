export default (type, uiSchema) => {
  const widget = uiSchema['ui:widget'];
  if (type === 'number' || type === 'integer' || widget === 'updown') {
    return 'number';
  }
  if (widget === 'password') {
    return 'password';
  }
  return type;
};
