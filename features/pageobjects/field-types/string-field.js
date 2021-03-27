const FieldUtils = require('../field-utils');

/**
 * String Field
 */
module.exports = {
  compareCurrentValue: (path, fieldUIValue) => {
    const fieldValue = $(path).getValue();
    expect(fieldValue).toStrictEqual(fieldUIValue);
  },
  updateAndCompareNewValue: (path, newValue) => {
    FieldUtils.clearValues(path);
    $(path).setValue(newValue);

    const fieldValue = $(path).getValue();
    expect(fieldValue).toStrictEqual(newValue);
  },
};
