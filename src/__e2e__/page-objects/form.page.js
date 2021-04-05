/* eslint-disable no-undef */
const Page = require('./page');
const _ = require('lodash');
// Fields
const StringField = require('./field-types/string-field');
const BooleanField = require('./field-types/boolean-field');
const ArrayField = require('./field-types/array-field');
const CustomField = require('./field-types/custom-field');

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
    this.hasXHRData = false;
    this.currentTab = false;
    this.hasTestsSchema = false;
    this.refrencePointer = false;
  }

  /**
   * define selectors using getter methods
   */
  get btnSubmit() {
    return $('//button[span[contains(text(), "Submit")]]');
  }

  callbackBeforeCompare = (fieldUIType) => {
    const $btnSubmit = $('//button[span[contains(text(), "Submit")]]');
    if (fieldUIType !== 'upload') {
      this.btnSubmit.click();
      this.btnSubmit.waitForClickable({ timeout: 10000 });
      browser.refresh();
    }
    this.btnSubmit.waitForClickable({ timeout: 10000 });
    if (this.currentTab) {
      $(
        `//button[@role="tab"][span[contains(text(), "${this.currentTab}")]]`
      ).click();
    }
  };

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

        if (shouldSkip === 'false') {
          switch (fieldType) {
            case 'string':
            case 'number':
            case 'integer':
              return StringField.compareCurrentValue(
                fieldName,
                fieldUIValue,
                fieldUIType
              );
            case 'boolean':
              return BooleanField.compareCurrentValue(
                fieldName,
                fieldUIValue,
                fieldUIType
              );
            case 'array':
              return ArrayField.compareCurrentValue(
                fieldName,
                fieldUIValue,
                fieldUIType
              );
          }
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
        const {
          fieldName,
          fieldType,
          fieldUIType,
          hasTestsSchema,
          refrencePointer,
        } = this;
        const fieldResultOnChange = tbl[0];
        const fieldUIResultOnChange = tbl[1];
        const fieldRef = tbl[2];
        const getRefrencePointer =
          fieldRef === refrencePointer
            ? refrencePointer
            : `${refrencePointer}.${fieldRef}.ui:test`;
        const getRefrencePointerSelectors =
          fieldRef === refrencePointer
            ? refrencePointer
            : `${refrencePointer}.${fieldRef}.ui:selectors`;
        if (
          hasTestsSchema &&
          refrencePointer &&
          _.get(hasTestsSchema, getRefrencePointer)
        ) {
          CustomField.execute({
            hasTestsSchema,
            getRefrencePointer,
            getRefrencePointerSelectors,
            callbackBeforeCompare: this.callbackBeforeCompare,
            fieldUIType,
          });
          return;
        }

        switch (fieldType) {
          case 'string':
          case 'number':
          case 'integer':
            StringField.updateNewValue(
              fieldName,
              fieldUIResultOnChange,
              fieldUIType
            );
            StringField.compareCurrentValue(
              fieldName,
              fieldUIResultOnChange,
              fieldUIType,
              this.callbackBeforeCompare
            );
            return;
          case 'boolean':
            BooleanField.updateNewValue(
              fieldName,
              fieldUIResultOnChange,
              fieldUIType
            );
            BooleanField.compareCurrentValue(
              fieldName,
              fieldUIResultOnChange,
              fieldUIType,
              this.callbackBeforeCompare
            );
            return;
          case 'array':
            ArrayField.updateNewValue(
              fieldName,
              fieldUIResultOnChange,
              fieldUIType
            );
            ArrayField.compareCurrentValue(
              fieldName,
              fieldUIResultOnChange,
              fieldUIType,
              this.callbackBeforeCompare
            );
            return;
        }
      }
    });
  }

  /**
   * overwrite specifc options to adapt it to page object
   */
  open(
    testRef,
    formPage,
    shouldReload,
    tabName,
    hasXHRData,
    folderName,
    refrencePointer
  ) {
    this.testRef = testRef;
    this.hasXHRData = hasXHRData;
    try {
      this.hasTestsSchema = require(`./generated/${folderName}/tests-schema.json`);
      this.refrencePointer = refrencePointer;
    } catch (er) {}
    if (shouldReload === 'true') {
      if (tabName !== 'false') {
        super.open(formPage);
        this.currentTab = tabName;
        return $(
          `//button[@role="tab"][span[contains(text(), "${tabName}")]]`
        ).click();
      }
      return super.open(formPage);
    }
    return {};
  }
}

module.exports = new FormPage();
