const _ = require('lodash');
const FieldUtils = require('../field-utils');

const validateTest = ({
  uiTestDef,
  callbackBeforeCompare,
  fieldUIType,
  uiSelectors,
}) => {
  if (
    uiTestDef.steps &&
    Array.isArray(uiTestDef.steps) &&
    uiTestDef.steps.length
  ) {
    uiTestDef.steps.forEach((stepDef) => {
      const getPathBySelector = (selectorDef) => _.get(uiSelectors, selectorDef);
      const path = getPathBySelector(stepDef.selector) || _.get(uiTestDef, stepDef.selector);
      const fieldValue = stepDef.action !== 'click' ? $(path).getValue() || $(path).getText() : '';
      switch (stepDef.action) {
        case 'click':
          try {
            if (stepDef.verify) {
              const {
                action,
                value: newValue,
                selector: verifySelector,
              } = stepDef.verify;
              const selector =
                getPathBySelector(verifySelector) ||
                _.get(uiTestDef, verifySelector);
              const verifyFieldValue =
                $(selector).getValue() || $(selector).getText();
              if (newValue && verifyFieldValue.includes(newValue) && action) {
                $(selector).click();
              }
            }
          } catch (err) {}
          $(path).scrollIntoView();
          $(path).click();
          return;
        case 'update':
          FieldUtils.clearValues(path);
          browser.keys(stepDef.value.split(''));
          return;
        case 'compare':
          callbackBeforeCompare(fieldUIType);
          expect(stepDef.value).toContain(fieldValue);
          return;
        case 'compareNegative':
          callbackBeforeCompare(fieldUIType, true);
          expect(stepDef.value).toContain(fieldValue);
          return;
        case 'isChecked':
          expect($(path)).toBeChecked();
          return;
      }
    });
  } else {
    expect('No Tests defined for custom components').toBe(uiTestDef);
  }
};

const execute = ({
  hasTestsSchema,
  getRefrencePointer,
  callbackBeforeCompare,
  getRefrencePointerSelectors,
  fieldUIType,
}) => {
  const uiTestDefs = _.get(hasTestsSchema, getRefrencePointer);
  const uiSelectors = _.get(hasTestsSchema, getRefrencePointerSelectors);
  if (uiTestDefs && Array.isArray(uiTestDefs)) {
    uiTestDefs.forEach((uiTestDef) => {
      validateTest({
        uiTestDef,
        callbackBeforeCompare,
        uiSelectors,
        fieldUIType,
      });
    });
  } else {
      validateTest({
        uiTestDef: uiTestDefs,
        callbackBeforeCompare,
        uiSelectors,
        fieldUIType,
      });
  }
};

/**
 * Boolean Field
 */
module.exports = {
  execute,
};
