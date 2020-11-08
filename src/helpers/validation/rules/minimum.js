export default (schema, uiSchema, value) => {
	const isRuleInValid = (minimum) => typeof value === 'number' && value < minimum;
	return {
		ruleName: 'minimum',
		schema,
		uiSchema,
		isRuleInValid,
		errorMessage: `'${schema.title}' should be >= ${schema.minimum}`,
	};
};
