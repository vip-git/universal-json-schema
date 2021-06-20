// Lodash
import isEmpty from 'lodash/isEmpty';
import omitBy from 'lodash/omitBy';
import forEach from 'lodash/forEach';

export const isEmptyValues = (value) => isEmpty(value)&& typeof value !== 'object' && typeof value !== 'number' && typeof value !== 'boolean';

export const filterNestedEmptyValues = (obj) => {
  const givenObj = { ...obj };
  forEach(givenObj, (val, key) => {
    if (Array.isArray(val) && val.length) {
      givenObj[key] = val.map((v) => (isEmptyValues(v) ? '' : v));
    }
    if (val && typeof val === 'object') {
      filterNestedEmptyValues(val);
    }
  });
  return omitBy(givenObj, isEmptyValues);
};

const removeEmptyObjectsFromString = (obj, schema) => (schema?.type === 'string' ? obj || '' : obj);

const removeEmptyObjects = (obj, schema) => (schema?.type === 'string' || schema?.type === 'null' || typeof obj === 'string'
  ? removeEmptyObjectsFromString(obj, schema)
  : filterNestedEmptyValues(obj));

export default removeEmptyObjects;
