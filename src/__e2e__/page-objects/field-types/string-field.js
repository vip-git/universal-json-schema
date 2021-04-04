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
  switch (fieldUIType) {
    case 'material-input':
    case 'password':
    case 'textarea':
    case 'material-date':
    case 'rich-text-editor':
    case 'upload':
      expect(fieldValue).toStrictEqual(fieldUIValue);
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
    case 'material-input':
    case 'password':
    case 'textarea':
    case 'material-date':
      FieldUtils.clearValues(path);
      $(path).setValue(newValue);
      return newValue;
    case 'material-native-select':
      $(path).click();
      $(enumSelector).click();
      return newValue;
    case 'material-select':
      $(path).click();
      $(enumSelector).click();
      return newValue;
    case 'rich-text-editor':
      $(path).click();
      FieldUtils.clearValues(path);
      $(path).click();
      browser.execute((richTextVal) => {
        document.querySelector('div[role="textbox"]').innerText = richTextVal;
      }, newValue);
      return newValue;
    case 'upload':
      FieldUtils.uploadFile(
        '/Users/vipinwork/htdocs/react-jsonschema-form-material-ui/docs/checkbox.md',
        '//input[@id="button-file"]'
      );
      return newValue;
    default:
      return newValue;
  }
};

/**
 * String Field
 */
module.exports = {
  compareCurrentValue,
  updateNewValue,
};
