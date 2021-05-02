import size from 'lodash/size';

export default (schema, uiSchema, value) => {
  const isRuleInValid = (minLength) => size(value) < minLength;
  return {
	ruleName: 'minLength',
	schema,
	uiSchema,
	isRuleInValid,
	errorMessage: `'${schema.title}' must be at least ${schema.minLength}`,
  };
};
