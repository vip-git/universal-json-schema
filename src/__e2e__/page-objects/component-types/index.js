/**
 *  Component Types
 */
module.exports = {
  getComponentSelector: (fieldName, fieldUIType, newValue) => {
    switch (fieldUIType) {
      case 'material-input':
      case 'password':
      case 'textarea':
      case 'updown':
      case 'range':
        return {
          path: `(//div/label[contains(text(), "${fieldName}")]/following-sibling::div/input)[1]`,
          secondarySelector: '',
        };

      case 'material-native-select':
      case 'material-multiselect-native':
        return {
          path: `//div/label[contains(text(),"${fieldName}")]/following-sibling::div`,
          secondarySelector: `//div/ul/li[contains(text(),"${newValue}")]`,
        };

      case 'rich-text-editor':
        return {
          path: '//div[@role="textbox"]',
          secondarySelector: '',
        };

      case 'checkboxes':
        return {
          singleSelector: `//div[legend[contains(text(), "${fieldName}")]]/label[contains(., "${newValue}")]/span/span/input`,
          path: `//fieldset[legend[contains(text(), "${fieldName}")]]/div/label/span/span/input`,
          secondarySelector: `//fieldset[legend[contains(text(), "${fieldName}")]]/div/label[contains(., "${newValue}")]/span/span/input`,
        };

      case 'material-checkbox':
        return {
          path: `//label[span[contains(text(), "${fieldName}")]]/span/span/input`,
          secondarySelector: '',
        };

      case 'radio':
        return {
          path: `//label[contains(text(), "${fieldName}")]/following-sibling::div/label[span[contains(text(), "${newValue}")]]/span/span/input`,
          secondarySelector: '',
        };

      case 'material-date':
        return {
          path: '//div/input[@placeholder="__-__-____"]',
          secondarySelector:
            '//div/input[@placeholder="__-__-____"]/following-sibling::div/button',
          thirdSelector:
            '(//button[not(@disabled)]/span[contains(., "15")])[1]',
          fourthSelector: '(//button[contains(., "OK")])[1]',
        };

      case 'upload':
        return {
          path: '//label/div/following-sibling::span',
          secondarySelector: '',
        };

      case 'creatable-select':
        return {
          path: `//div/span[contains(text(),"${fieldName}")]/following-sibling::div`,
          secondarySelector: `//div[span[contains(text(),"${fieldName}")]]/div/div/div/div[contains(text(),"${newValue}")]`,
        };

      case 'material-select':
      case 'material-multiselect':
        return {
          path: `//div/label[contains(text(),"${fieldName}")]/following-sibling::div`,
          secondarySelector: `//div[label[contains(text(),"${fieldName}")]]/following-sibling::div/div/div[contains(text(),"${newValue}")]`,
        };

      default:
        return '';
    }
  },
};
