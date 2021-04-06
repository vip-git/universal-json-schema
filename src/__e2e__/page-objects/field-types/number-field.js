const FieldUtils = require('../field-utils');
const { getComponentSelector } = require('../component-types');

const compareCurrentValue = (
  fieldName,
  fieldUIValue,
  fieldUIType,
  callbackBeforeCompare
) => {
  callbackBeforeCompare(fieldUIType);
  const { path } = getComponentSelector(fieldName, fieldUIType, fieldUIValue);
  const fieldValue = $(path).getValue() || $(path).getText();
  if (fieldUIValue !== 'false') {
    switch (fieldUIType) {
      case 'material-input':
      case 'updown':
      case 'range':
        expect(fieldValue).toStrictEqual(fieldUIValue);
        return fieldValue;
      case 'material-checkbox':
      case 'radio':
        expect($(path)).toBeChecked();
        return fieldValue;
      case 'material-native-select':
        expect(fieldValue).toContain(fieldUIValue);
        return fieldValue;
    }
  }
};

const updateNewValue = (fieldName, newValue, fieldUIType) => {
  const { path, secondarySelector } = getComponentSelector(
    fieldName,
    fieldUIType,
    newValue
  );
  switch (fieldUIType) {
    case 'material-input':
    case 'updown':
    case 'range':
      FieldUtils.clearValues(path);
      $(path).setValue(newValue);
      return newValue;
    case 'radio':
      $(path).click();
      return newValue;
    case 'material-native-select':
      $(path).click();
      $(secondarySelector).click();
      return newValue;
  }
};

/**
 * Number Field
 */
module.exports = {
  compareCurrentValue,
  updateNewValue,
};
