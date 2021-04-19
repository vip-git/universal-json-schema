import mapValues from 'lodash/mapValues';

const getDefaultValue = (schema = {}) => {
  if (schema.default) return schema.default;
  switch (schema.type) {
    case 'object':
      return mapValues(schema.properties, getDefaultValue);
    case 'array':
      return [];
    case 'string':
    case 'number':
    default:
      return '';
  }
};

export default getDefaultValue;
