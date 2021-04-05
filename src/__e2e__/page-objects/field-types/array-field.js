const FieldUtils = require('../field-utils');
const { getComponentSelector } = require('../component-types');

const compareCurrentValue = (fieldName, fieldUIValue, fieldUIType, callbackBeforeCompare) => {
  callbackBeforeCompare(fieldUIType);
  const { path } = getComponentSelector(fieldName, fieldUIType, fieldUIValue);
  const fieldValue = $(path).getValue() || $(path).getText();
  switch (fieldUIType) {
    case 'material-multiselect-native':
      expect(fieldValue).toContain(fieldUIValue);
      return fieldValue;

    case 'creatable-select':
    case 'material-multiselect':
      expect(fieldValue).toContain(fieldUIValue);
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
  const fieldValue = $(path).getValue() || $(path).getText();
  switch (fieldUIType) {
    case 'material-multiselect-native':
      if (fieldValue.includes(newValue)){
          $(path).click();
          $(enumSelector).click();
          browser.keys(['Escape']);
      } 
      $(path).click();
      $(enumSelector).click();
      browser.keys(['Escape']);
      return newValue;
    case 'creatable-select':
    case 'material-multiselect':
       if (fieldValue.includes(newValue)) {
         $(path).click();
         browser.keys(['Backspace', 'Backspace', newValue, 'Enter']);
       } else {
        $(path).click();
        $(enumSelector).click();
       }
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
