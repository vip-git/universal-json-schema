// Rules
import maxLength from './max-length';
import minLength from './min-length';
import pattern from './pattern';
import minimum from './minimum';
import maximum from './maximum';

const ruleVerifier = ({
  ruleName, 
  schema = {}, 
  uiSchema = {}, 
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
  maxLength: (schema, uiSchema, value) => ruleVerifier({ ...maxLength(schema, uiSchema, value) }),
  minLength: (schema, uiSchema, value) => ruleVerifier({ ...minLength(schema, uiSchema, value) }),
  pattern: (schema, uiSchema, value) => ruleVerifier({ ...pattern(schema, uiSchema, value) }),
  minimum: (schema, uiSchema, value) => ruleVerifier({ ...minimum(schema, uiSchema, value) }),
  maximum: (schema, uiSchema, value) => ruleVerifier({ ...maximum(schema, uiSchema, value) }),
};
