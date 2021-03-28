const FieldUtils = require('../field-utils');
const { getComponentSelector } = require('../component-types');

const compareCurrentValue = (fieldName, fieldUIValue, fieldUIType) => {
  const path = getComponentSelector(fieldName, fieldUIType);
  const fieldValue = $(path).getValue();
  switch (fieldUIType) {
    case 'material-input':
      expect(fieldValue).toStrictEqual(fieldUIValue);
      return fieldValue;

    default:
      return fieldValue;
  }
};

const updateAndCompareNewValue = (fieldName, newValue, fieldUIType) => {
  switch (fieldUIType) {
    case 'material-input':
      const path = getComponentSelector(fieldName);
      FieldUtils.clearValues(path);
      $(path).setValue(newValue);
      return newValue;

    default:
      return newValue;
  }
  compareCurrentValue(fieldName, newValue, fieldUIType);
};

/**
 * String Field
 */
module.exports = {
  compareCurrentValue,
  updateAndCompareNewValue,
};
