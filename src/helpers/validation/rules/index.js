/* eslint-disable global-require */
const ruleVerifier = ({
  ruleName, 
  schema, 
  uiSchema, 
  isRuleInValid, 
  errorMessage,
}) => {
  if (
    uiSchema
    && uiSchema['ui:validations']
    && uiSchema['ui:validations'][ruleName]
  ) {
    const { value, message, inline } = uiSchema['ui:validations'][ruleName];
    if (isRuleInValid(value)) {
      return {
        message,
        inline,
      };
    }
  }
  else if (ruleName && schema[ruleName] && isRuleInValid(schema[ruleName])) {
    return {
      message: errorMessage,
    };
  }

  return null;
};

export default {
  maxLength: (schema, uiSchema, value) => ruleVerifier({ ...require('./max-length').default(schema, uiSchema, value) }),
  minLength: (schema, uiSchema, value) => ruleVerifier({ ...require('./min-length').default(schema, uiSchema, value) }),
  pattern: (schema, uiSchema, value) => ruleVerifier({ ...require('./pattern').default(schema, uiSchema, value) }),
  minimum: (schema, uiSchema, value) => ruleVerifier({ ...require('./minimum').default(schema, uiSchema, value) }),
  maximum: (schema, uiSchema, value) => ruleVerifier({ ...require('./maximum').default(schema, uiSchema, value) }),
};
