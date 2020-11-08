// import update from 'immutability-helper';
import forOwn from 'lodash/forOwn';
import mapValues from 'lodash/mapValues';
import rules from './rules';

const validationResult = (schema, uiSchema, value) => {
  const rv = [];
  forOwn(rules, (rule, ruleId) => {
    const result = rule(schema, uiSchema, value);
    if (result) {
      rv.push({
        rule: ruleId,
        ...result,
      });
    }
  });
  return rv;
};

const getFieldSpec = (schema, uiSchema, value) => {
  if (value === null) {
    return [];
  }
  if (typeof value === 'number' || typeof value === 'string') {
    return validationResult(schema, uiSchema, value);
  }
  return mapValues(schema.properties, (s, p) => getFieldSpec(s, uiSchema[p], value[p]));
};

export default (schema, uiSchema, data) => {
  const spec = getFieldSpec(schema, uiSchema, data);
  return { ...spec };
};
