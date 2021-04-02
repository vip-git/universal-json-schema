/**
 *  Component Types
 */
module.exports = {
  getComponentSelector: (fieldName, fieldUIType, newValue) => {
    switch (fieldUIType) {
      case 'material-input':
      case 'password':
      case 'textarea':
        return {
          path: `//div/label[contains(text(),"${fieldName}")]/following-sibling::div/input`,
          enumSelector: '',
        };

      case 'material-native-select':
      case 'material-multiselect-native':
        return {
          path: `//div/label[contains(text(),"${fieldName}")]/following-sibling::div`,
          enumSelector: `//div/ul/li[contains(text(),"${newValue}")]`,
        };

      case 'rich-text-editor':
        return {
          path: '//div[@role="textbox"]',
          enumSelector: '',
        };

      case 'material-checkbox':
        return {
          path: `//label[span[contains(text(), "${fieldName}")]]/span/span/input`,
          enumSelector: '',
        };

      case 'radio':
        return {
          path: `//label[contains(text(), "${fieldName}")]/following-sibling::div/label[span[contains(text(), "${newValue}")]]/span/span/input`,
          enumSelector: '',
        };

      case 'material-date':
        return {
          path: '//div/input[@placeholder="__-__-____"]',
          enumSelector: '',
        };

      case 'upload':
        return {
          path: '//label/div/following-sibling::span',
          enumSelector: '',
        };

      case 'creatable-select':
        return {
          path: `//div/span[contains(text(),"${fieldName}")]/following-sibling::div`,
          enumSelector: `//div[span[contains(text(),"${fieldName}")]]/div/div/div/div[contains(text(),"${newValue}")]`,
        };

      case 'material-select':
      case 'material-multiselect':
        return {
          path: `//div/label[contains(text(),"${fieldName}")]/following-sibling::div`,
          enumSelector: `//div[label[contains(text(),"${fieldName}")]]/following-sibling::div/div/div[contains(text(),"${newValue}")]`,
        };

      default:
        return '';
    }
  },
};
