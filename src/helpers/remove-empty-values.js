// Lodash
// Lodash
import isEmpty from 'lodash/isEmpty';
import omitBy from 'lodash/omitBy';

export const isEmptyValues = (value) => isEmpty(value) && typeof value !== 'number' && typeof value !== 'boolean';

const removeEmptyObjects = (obj) => omitBy(obj, isEmptyValues);

export default removeEmptyObjects;
