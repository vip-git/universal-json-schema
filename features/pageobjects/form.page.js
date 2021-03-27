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
        const fieldName = tbl[0];
        const fieldType = tbl[1];
        const fieldFormValue = tbl[2];
        const fieldUIValue = tbl[3];
        const fieldRef = tbl[4];
        if (fieldType === 'string') {
          StringField.compareCurrentValue(
            `//div/label[contains(text(),"${fieldName}")]/following-sibling::div/input`,
            fieldUIValue
          );
        }

        this.fieldName = fieldName;
        this.fieldType = fieldType;
      }
    });
  }

  changeFieldValueAndSubmit(table) {
    table.rawTable.forEach((tbl, tbli) => {
      if (tbl.includes(this.testRef) && tbli >= 1) {
        const { fieldName, fieldType } = this;
        const fieldResultOnChange = tbl[0];
        const fieldUIResultOnChange = tbl[1];
        const fieldRef = tbl[2];
        if (fieldType === 'string') {
          StringField.updateAndCompareNewValue(
            `//div/label[contains(text(),"${fieldName}")]/following-sibling::div/input`,
            fieldUIResultOnChange
          );
          this.btnSubmit.click();
        }
      }
    });
  }

  /**
   * overwrite specifc options to adapt it to page object
   */
  open(testRef, formPage) {
    this.testRef = testRef;
    return super.open(formPage);
  }
}

module.exports = new FormPage();
