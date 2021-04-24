/* eslint-disable no-undef */
const Page = require('./page');
const _ = require('lodash');
// Fields
const StringField = require('./field-types/string-field');
const NumberField = require('./field-types/number-field');
const BooleanField = require('./field-types/boolean-field');
const ArrayField = require('./field-types/array-field');
const CustomField = require('./field-types/custom-field');

const fieldOrder = {};
const previousFields = [];

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
    this.folderName = false;
    this.fieldOrder = {};
  }

  /**
   * define selectors using getter methods
   */
  get btnSubmit() {
    return $('//button[span[contains(text(), "Submit")]]');
  }

  callbackBeforeCompare = (fieldUIType, reverse) => {
    const $btnSubmit = $('//button[span[contains(text(), "Submit")]]');
    if (fieldUIType !== 'upload' && !reverse) {
      this.btnSubmit.waitForClickable({ timeout: 10000 });
      this.btnSubmit.click();
      this.btnSubmit.waitForClickable({ timeout: 10000 });
      if (this.hasXHRData) {
        browser.refresh();
      }
    }

    if (reverse) {
      this.btnSubmit.waitForClickable({ timeout: 10000, reverse });
      expect(this.btnSubmit).toBeDisabled();
    }

    if (this.currentTab) {
      this.btnSubmit.waitForClickable({ timeout: 10000 });
      try {
        $('//button[@aria-label="full-screen-code"]').click();
      } catch(err) {}
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
    if (this.hasXHRData && browser.capabilities.browserName.toLowerCase() !== 'chrome') {
      return;
    }
    table.rawTable.forEach((rt) => {
      fieldOrder[rt[0]] = fieldOrder[rt[0]] ? fieldOrder[rt[0]] : 1;
    });
    table.rawTable.forEach((tbl, tbli) => {
      if (tbl.includes(this.testRef) && tbli >= 1) {
         const {
          hasTestsSchema,
          refrencePointer,
          folderName,
        } = this;
        /** Todo: get index based on name - dont hardcode */
        const fieldName = tbl[0];
        const fieldType = tbl[1];
        const fieldUIType = tbl[2];
        const fieldFormValue = tbl[3];
        const fieldUIValue = tbl[4];
        const fieldRef = tbl[5];
        const shouldSkip = tbl[6];

        if (previousFields.includes(fieldName)) {
          fieldOrder[fieldName]++;
        }

        this.fieldName = fieldName;
        this.fieldType = fieldType;
        this.fieldUIType = fieldUIType;
        this.fieldOrder = fieldOrder;

        previousFields.push(fieldName);

        const getRefrencePointer =
          refrencePointer === folderName
            ? `${fieldRef}.ui:test`
            : `${refrencePointer}.${fieldRef}.ui:test`;
        const getRefrencePointerSelectors =
          refrencePointer === folderName
            ? `${fieldRef}.ui:selectors`
            : `${refrencePointer}.${fieldRef}.ui:selectors`;
        
        if (shouldSkip === 'false' && !_.has(hasTestsSchema, getRefrencePointer)) {
          switch (fieldType) {
            case 'string':
              return StringField.compareCurrentValue(
                fieldName,
                fieldUIValue,
                fieldUIType,
                this.callbackBeforeCompare,
                fieldOrder[fieldName]
              );
            case 'number':
            case 'integer':
              return NumberField.compareCurrentValue(
                fieldName,
                fieldUIValue,
                fieldUIType,
                this.callbackBeforeCompare,
                fieldOrder[fieldName]
              );
            case 'boolean':
              return BooleanField.compareCurrentValue(
                fieldName,
                fieldUIValue,
                fieldUIType,
                this.callbackBeforeCompare,
                fieldOrder[fieldName]
              );
            case 'array':
              return ArrayField.compareCurrentValue(
                fieldName,
                fieldUIValue,
                fieldUIType,
                this.callbackBeforeCompare,
                fieldOrder[fieldName]
              );
          }
        }
      }
    });
  }

  changeFieldValueAndSubmit(table) {
    if (this.hasXHRData && browser.capabilities.browserName.toLowerCase() !== 'chrome') {
      return;
    }
    table.rawTable.forEach((tbl, tbli) => {
      if (tbl.includes(this.testRef) && tbli >= 1) {
        const {
          fieldName,
          fieldType,
          fieldUIType,
          hasTestsSchema,
          refrencePointer,
          folderName,
          fieldOrder,
        } = this;
        const fieldResultOnChange = tbl[0];
        const fieldUIResultOnChange = tbl[1];
        const fieldRef = tbl[2];
        const getRefrencePointer =
          refrencePointer === folderName
            ? `${fieldRef}.ui:test`
            : `${refrencePointer}.${fieldRef}.ui:test`;
        const getRefrencePointerSelectors =
          refrencePointer === folderName
            ? `${fieldRef}.ui:selectors`
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
            StringField.updateNewValue(
              fieldName,
              fieldUIResultOnChange,
              fieldUIType,
              fieldOrder[fieldName]
            );
            StringField.compareCurrentValue(
              fieldName,
              fieldUIResultOnChange,
              fieldUIType,
              this.callbackBeforeCompare,
              fieldOrder[fieldName]
            );
            return;

          case 'number':
          case 'integer':
            NumberField.updateNewValue(
              fieldName,
              fieldUIResultOnChange,
              fieldUIType,
              fieldOrder[fieldName]
            );
            NumberField.compareCurrentValue(
              fieldName,
              fieldUIResultOnChange,
              fieldUIType,
              this.callbackBeforeCompare,
              fieldOrder[fieldName]
            );
            return;

          case 'boolean':
            BooleanField.updateNewValue(
              fieldName,
              fieldUIResultOnChange,
              fieldUIType,
              fieldOrder[fieldName]
            );
            BooleanField.compareCurrentValue(
              fieldName,
              fieldUIResultOnChange,
              fieldUIType,
              this.callbackBeforeCompare,
              fieldOrder[fieldName]
            );
            return;
          case 'array':
            ArrayField.updateNewValue(
              fieldName,
              fieldUIResultOnChange,
              fieldUIType,
              fieldOrder[fieldName]
            );
            ArrayField.compareCurrentValue(
              fieldName,
              fieldUIResultOnChange,
              fieldUIType,
              this.callbackBeforeCompare,
              fieldOrder[fieldName]
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
      this.folderName = folderName;
    } catch (er) {}
    if (shouldReload === 'true') {
      if (tabName !== 'false') {
        super.open(formPage);
        this.currentTab = tabName;
        return  $(
          `//button[@role="tab"][span[contains(text(), "${tabName}")]]`
        ).click();
      }
      return super.open(formPage);
    }
    return {};
  }
}

module.exports = new FormPage();
