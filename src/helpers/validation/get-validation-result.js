// import update from 'immutability-helper';
import forOwn from 'lodash/forOwn';
import mapValues from 'lodash/mapValues';
import rules from './rules';

const validationResult = (schema, value) => {
  const rv = [];
  forOwn(rules, (rule, ruleId) => {
    const result = rule(schema, value);
    if (result) {
      rv.push({
        rule: ruleId,
        ...result,
      });
    }
  });
  return rv;
};

const getFieldSpec = (schema, value) => {
  if (value === null) {
    return [];
  }
  if (typeof value === 'number' || typeof value === 'string') {
    return validationResult(schema, value);
  }
  return mapValues(schema.properties, (s, p) => getFieldSpec(s, value[p]));
};

export default (schema, data) => {
  const spec = getFieldSpec(schema, data);
  return { ...spec };
};
