/**
 *  Component Types
 */
module.exports = {
  getComponentSelector: (fieldName, fieldUIType) => {
    switch (fieldUIType) {
      case 'material-input':
        return `//div/label[contains(text(),"${fieldName}")]/following-sibling::div/input`;

      default:
        return `//div/label[contains(text(),"${fieldName}")]/following-sibling::div/input`;
    }
  },
};
