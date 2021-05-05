import update from 'immutability-helper';
import { has, get, each, set, omit } from 'lodash';
import size from 'lodash/size';

const arrRegex = /^([^.]+)\[([0-9]+)\](\.(.*))?/;
const dotRegex = /^([^[]+)\.(.*$)/;
const applyAtPath = (path, data, spec) => {
  if (!path) return spec(data);
  const dotMatch = path.match(dotRegex);
  const arrMatch = path.match(arrRegex);
  if (!dotMatch && !arrMatch) {
    return { [path]: spec(data[path]) };
  }
  if (dotMatch) {
    const subPath = dotMatch[1];
    const prop = dotMatch[2];
    return { [subPath]: applyAtPath(prop, data[subPath], spec) };
  }
  if (arrMatch) {
    try {
      const subPath = arrMatch[1];
      const index = Number(arrMatch[2]);
      return {
        [subPath]: {
          [index]: applyAtPath(arrMatch[4], data[subPath][index], spec),
        },
      };
    } 
    catch (err) {
      return {};
    }
  }
  return {};
};

// if (typeof value === 'object' && size(value) === 1) return value;
const setValueSpec = (value) => () => ({ $set: value });
const pushItemSpec = (value) => (data) => {
  if (data) return ({ $push: [value] });
  return ({ $set: [value] });
};

const removeItemSpec = (idx) => () => ({ $splice: [[idx, 1]] });

const moveItemSpec = (idx, direction) => (value) => ({
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  [idx]: { $set: value[idx + direction] },
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  [idx + direction]: { $set: value[idx] },
});

export default (givenData, path, value) => {
  const arrayRegex = /\[(.*?)\]/g;
  const data = { ...givenData };
  const matchPath = path.replace(arrayRegex, '');
  if (
    matchPath
    && matchPath.includes('.')
    && ((data && !has(data, matchPath.split('.')[0]))
      || typeof get(data, matchPath.split('.')[0]) !== 'object')
  ) {
    data[matchPath.split('.')[0]] = {};
  }
  const s = setValueSpec(value);
  const spec = applyAtPath(path, data, s);
  return update(data, spec);
};

export const updateKeyFromSpec = (data, oldPath, newPath) => update(data, (obj) => Object.keys(obj)
  .reduce((acc, key) => {
    if (key === oldPath) {
      acc[newPath] = obj[oldPath];
    }
    else {
      acc[key] = obj[key];
    }
    return acc;
  }, {}),
);

export const setUISchemaData = (givenUIData, uiSchema, path?: string, nestedSchema?: any) => {
  const iterateSchema = nestedSchema || uiSchema; 
  if (typeof givenUIData === 'object') {
    each(iterateSchema, (val, key) => {
      const getPath = path ? `${path}.${key}` : key;
      if (has(val, 'ui:data') || has(givenUIData, getPath)) {
        if (typeof get(givenUIData, getPath) === 'object') {
          setUISchemaData(givenUIData, uiSchema, getPath, uiSchema[getPath]);
        }
        else {
          set(uiSchema, `${getPath}.ui:data`, get(givenUIData, getPath));
        }
      }
    });
  }
};

export const removeValueFromSpec = (uiData, path) => omit(uiData, path);

export const addListItem = (givenData, path, value) => {
  const data = { ...givenData };
  const matchPath = path.replace(/\[(.*?)\]/g, '');
  if (
    matchPath
    && matchPath.includes('.')
    && data
    && !has(data, matchPath.split('.')[0])
  ) {
    data[matchPath.split('.')[0]] = {};
  }
  const spec = applyAtPath(path, data, pushItemSpec(value));
  return update(data, spec);
};

export const removeListItem = (data, path, index) => {
  const spec = applyAtPath(path, data, removeItemSpec(index));
  return update(data, spec);
};

export const moveListItem = (data, path, index, direction) => {
  const spec = applyAtPath(path, data, moveItemSpec(index, direction));
  return update(data, spec);
};
