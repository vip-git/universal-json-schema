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
        return {
          path: `//div/label[contains(text(),"${fieldName}")]/following-sibling::div`,
          enumSelector: `//div/ul/li[contains(text(),"${newValue}")]`,
        };

      case 'rich-text-editor':
        return {
          path: '//div[@role="textbox"]',
          enumSelector: '',
        };

      case 'material-date':
        return {
          path: '//div/input[@placeholder="__-__-____"]',
          enumSelector: '',
        };

      case 'material-select':
        return {
          path: `//div/label[contains(text(),"${fieldName}")]/following-sibling::div`,
          enumSelector: `//div[label[contains(text(),"${fieldName}")]]/following-sibling::div/div/div[contains(text(),"${newValue}")]`,
        };

      default:
        return '';
    }
  },
};
