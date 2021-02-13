// Lodash
import isEmpty from 'lodash/isEmpty';
import omitBy from 'lodash/omitBy';
import forEach from 'lodash/forEach';
import unset from 'lodash/unset';

// Utils
import getDefinitionSchemaFromRef from './get-definition-schema';

export const isEmptyValues = (value) => isEmpty(value) && typeof value !== 'number' && typeof value !== 'boolean';

export const filterNestedEmptyValues = (obj) => {
  forEach(obj, (val, key) => {
    if (val && typeof val === 'object') {
      filterNestedEmptyValues(val);
    }
    if (Array.isArray(val) && !val.length) {
      unset(obj, key);
    }
  });
  return omitBy(obj, isEmptyValues);
};

const removeEmptyObjects = (obj) => filterNestedEmptyValues(obj);

export default removeEmptyObjects;
