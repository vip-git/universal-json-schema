/* eslint-disable no-undef */
const Page = require('./page');

// Fields
const StringField = require('./field-types/string-field');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class FormPage extends Page {
  constructor() {
    super();
    this.testRef = '';
    this.fieldName = '';
    this.fieldType = '';
    this.fieldUIType = '';
  }

  /**
   * define selectors using getter methods
   */
  get btnSubmit() {
    return $('//button[span[contains(text(), "Submit")]]');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  testField(table) {
    table.rawTable.forEach((tbl, tbli) => {
      if (tbl.includes(this.testRef) && tbli >= 1) {
        /** Todo: get index based on name - dont hardcode */
        const fieldName = tbl[0];
        const fieldType = tbl[1];
        const fieldUIType = tbl[2];
        const fieldFormValue = tbl[3];
        const fieldUIValue = tbl[4];
        const fieldRef = tbl[5];
        const shouldSkip = tbl[6];
        if (
          fieldType === 'string' &&
          shouldSkip === 'false' &&
          fieldUIType === 'material-input'
        ) {
          StringField.compareCurrentValue(
            `//div/label[contains(text(),"${fieldName}")]/following-sibling::div/input`,
            fieldUIValue
          );
        }

        this.fieldName = fieldName;
        this.fieldType = fieldType;
        this.fieldUIType = fieldUIType;
      }
    });
  }

  changeFieldValueAndSubmit(table) {
    table.rawTable.forEach((tbl, tbli) => {
      if (tbl.includes(this.testRef) && tbli >= 1) {
        const { fieldName, fieldType, fieldUIType } = this;
        const fieldResultOnChange = tbl[0];
        const fieldUIResultOnChange = tbl[1];
        const fieldRef = tbl[2];
        if (fieldType === 'string' && fieldUIType === 'material-input') {
          StringField.updateAndCompareNewValue(
            `//div/label[contains(text(),"${fieldName}")]/following-sibling::div/input`,
            fieldUIResultOnChange
          );
          this.btnSubmit.waitForClickable({ timeout: 4000 });
          this.btnSubmit.click();
        }
      }
    });
  }

  /**
   * overwrite specifc options to adapt it to page object
   */
  open(testRef, formPage, shouldReload) {
    this.testRef = testRef;
    return shouldReload === 'true' ? super.open(formPage) : {};
  }
}

module.exports = new FormPage();
