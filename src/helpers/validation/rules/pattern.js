/* eslint-disable */
import size from 'lodash/size';
export default (schema, uiSchema, value) => {
	const isRuleInValid = (pattern) => !RegExp(pattern).test(value);
	return {
		ruleName: 'pattern',
		schema,
		uiSchema,
		isRuleInValid,
		errorMessage: `'${schema.title}' must match pattern ${schema.pattern}`,
	};
};
