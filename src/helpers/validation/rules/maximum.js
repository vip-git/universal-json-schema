export default (schema, uiSchema, value) => {
	const isRuleInValid = (maximum) => typeof value === 'number' && value > maximum;
	return {
		ruleName: 'maximum',
		schema,
		uiSchema,
		isRuleInValid,
		errorMessage: `'${schema.title}' should be <= ${schema.maximum}`,
	};
};
