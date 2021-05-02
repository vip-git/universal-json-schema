import size from 'lodash/size';

export default (schema, uiSchema, value) => {
  const isRuleInValid = (maxLength) => size(value) > maxLength;
  return {
    ruleName: 'maxLength',
    schema,
    uiSchema,
    isRuleInValid,
    errorMessage: `'${value}' exceeds the maximum length of ${schema.maxLength} for field '${schema.title}'`,
  };
};
