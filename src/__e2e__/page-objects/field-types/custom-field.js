const _ = require('lodash');

const validateTest = ({ uiTestDef, callbackBeforeCompare, fieldUIType }) => {
  if (
    uiTestDef.steps &&
    Array.isArray(uiTestDef.steps) &&
    uiTestDef.steps.length
  ) {
    uiTestDef.steps.forEach((stepDef) => {
      const path = _.get(uiTestDef, stepDef.selector);
      const fieldValue = $(path).getValue() || $(path).getText();
      switch (stepDef.action) {
        case 'click':
            if (stepDef.verify) {
                const { action, value: newValue, selector: verifySelector } = stepDef.verify;
                const selector = _.get(uiTestDef, verifySelector);
                const verifyFieldValue = $(selector).getValue() || $(selector).getText();;
                if (newValue && verifyFieldValue.includes(newValue) && action) {
                  $(selector).click();
                }
            }
            $(path).click();
          return;
        case 'compare':
          callbackBeforeCompare(fieldUIType);
          expect(stepDef.value).toContain(fieldValue);
          return;
      }
    });
  } else {
    expect('No Tests defined for custom components').toBe(getRefrencePointer);
  }
};

const execute = ({
  hasTestsSchema,
  getRefrencePointer,
  callbackBeforeCompare,
  fieldUIType,
}) => {
  const uiTestDefs = _.get(hasTestsSchema, getRefrencePointer);
  if (uiTestDefs && Array.isArray(uiTestDefs)) {
    uiTestDefs.forEach((uiTestDef) => {
      validateTest({ 
          uiTestDef, 
          callbackBeforeCompare, 
          fieldUIType 
      });
    });
  } else {
      validateTest({
        uiTestDef: uiTestDefs,
        callbackBeforeCompare,
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
