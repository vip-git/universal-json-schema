const FieldUtils = require('../field-utils');
const { getComponentSelector } = require('../component-types');

const compareCurrentValue = (
  fieldName,
  fieldUIValue,
  fieldUIType,
  callbackBeforeCompare
) => {
  callbackBeforeCompare();
  const { path } = getComponentSelector(fieldName, fieldUIType, fieldUIValue);
  const fieldValue = $(path);
  switch (fieldUIType) {
    case 'material-checkbox':
    case 'radio':
      expect(fieldValue).toBeChecked();
      return fieldValue;

    default:
      return fieldValue;
  }
};

const updateNewValue = (fieldName, newValue, fieldUIType) => {
  const { path, enumSelector } = getComponentSelector(
    fieldName,
    fieldUIType,
    newValue
  );
  switch (fieldUIType) {
    case 'material-checkbox':
      $(path).click();
      return newValue;
    case 'radio':
      $(path).click();
      return newValue;
    default:
      return newValue;
  }
};

/**
 * Boolean Field
 */
module.exports = {
  compareCurrentValue,
  updateNewValue,
};
