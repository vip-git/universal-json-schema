const _ = require('lodash');

const execute = ({
  hasTestsSchema,
  getRefrencePointer,
  callbackBeforeCompare,
  fieldUIType,
}) => {
  const uiTestDef = _.get(hasTestsSchema, getRefrencePointer);
  if (
    uiTestDef.steps &&
    Array.isArray(uiTestDef.steps) &&
    uiTestDef.steps.length
  ) {
    uiTestDef.steps.forEach((stepDef) => {
      const path = _.get(uiTestDef, stepDef.selector);
      switch (stepDef.action) {
        case 'click':
          $(path).click();
          return;
        case 'compare':
          callbackBeforeCompare(fieldUIType);
          const fieldValue = $(path).getValue() || $(path).getText();
          expect(stepDef.value).toContain(fieldValue);
          return;
      }
    });
  } else {
    expect('No Tests defined for custom components').toBe(getRefrencePointer);
  }
};

/**
 * Boolean Field
 */
module.exports = {
  execute,
};
