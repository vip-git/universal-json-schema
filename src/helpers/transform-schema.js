// Library
import { has, get, set } from 'lodash';
import each from 'lodash/each';

// Helpers
import getDefinitionSchemaFromRef from './get-definition-schema';

// Interceptors
const { INTERCEPTOR_CONFIG } = require('../generated/interceptors');

export const hashCode = (s) => {
  let h = 0; const l = s.length; let 
    i = 0;
  // eslint-disable-next-line no-bitwise
  if (l > 0) while (i < l) h = (h << 5) - h + s.charCodeAt(i++) | 0;
  return h;
};

const translateTemplateString = (str, obj, type) => {
  if (obj) {
    const parts = str.split(/\$\{(?!\d)[\wæøåÆØÅ.]*\}/);
    const args = str.match(/[^{}]+(?=})/g) || [];
    const parameters = args.map(
      (argument) => get(obj, argument)
        || (get(obj, argument) === undefined ? '' : get(obj, argument)),
    );
    switch (type) {
      case 'array':
      case 'object':
        return parameters[0];
      case 'integer':
      case 'number':
        return parseInt(parameters, 36);
      case 'boolean':
        return parameters[0] === 'true';
      default:
        return String.raw({ raw: parts }, ...parameters);
    }
  }
  return obj;
};

const setNestedData = ({
  formData,
  returnUIData,
  parentData,
  returnData,
  schemaProps,
  uiSchema,
  interceptors,
  xhrData,
  extraKey,
  isUIData,
}) => {
  Object.keys(formData).forEach((fd) => {
    const objectKey = extraKey ? `${extraKey}.${fd}` : fd;
    const orignalData = parentData || formData;
    const currentData = get(orignalData, objectKey);
    const currentSchemaObj = get(schemaProps, fd);
    if (typeof currentData === 'object') {
      setNestedData({
        formData: currentData,
        parentData: orignalData,
        schemaProps: currentSchemaObj.properties,
        returnData,
        uiSchema,
        xhrData,
        extraKey: fd,
      });
    }
    else if (currentData && currentSchemaObj) {
      const interceptorFunc = get(uiSchema, `${objectKey}.ui:interceptor`);
      const options = get(uiSchema, `${objectKey}.ui:options`);
      const value = translateTemplateString(
        currentData,
        xhrData,
        currentSchemaObj.type,
      );
      if (interceptorFunc) {
        const uiValue = translateTemplateString(currentData, xhrData, 'string');
        const getMethod = INTERCEPTOR_CONFIG[interceptorFunc]?.interceptor || interceptors[interceptorFunc];
        const { formData: fData, uiData } = getMethod({
          value,
          uiValue,
          options,
        });
        set(returnData, objectKey, fData);
        set(returnUIData, objectKey, uiData);
      } 
      else {
        set(returnData, objectKey, value);
      }
    }
  });
};

export const mapData = (
  mapResults,
  xhrData,
  data,
  iniUiData,
  uiSchema,
  interceptors,
  schema,
  onChange,
  onError,
  setData,
) => {
  const returnData = { ...data };
  const returnUIData = { ...iniUiData };
  // Set Form and UI Data
  setNestedData({
    formData: mapResults,
    xhrData,
    returnData,
    returnUIData,
    schemaProps: schema.properties,
    interceptors,
    uiSchema,
  });
  // Set Global Form and UI Data
  setData(
    returnData,
    returnUIData,
    uiSchema,
    schema,
    onChange,
    onError,
  );
  return {
    returnData,
    returnUIData,
  };
};

const transformEnums = (enums) => {
  const enumVals = [];
  const enumTitles = [];
  each(
    enums.filter((e) => !e.disabled),
    (enumVal) => {
      if (enumVal.key || typeof enumVal.key === 'boolean') {
        enumVals.push(enumVal.key);
        enumTitles.push(enumVal.key);
      }
      else {
        enumVals.push(enumVal);
        enumTitles.push(enumVal);
      }
    },
  );

  return {
    enumVals,
    enumTitles,
  };
};

const transformSchema = (schema, data) => {
  const transformedSchema = JSON.parse(JSON.stringify(schema));

  const notAllowedTypes = ['upload', 'material-date'];
  each(transformedSchema, (givenValue, key) => {
    if (key === 'properties') {
      each(givenValue, (propVal, propKey) => {
        if (notAllowedTypes.includes(propVal.type)) {
          transformedSchema.properties[propKey].type = 'string';
        }
        if (propVal.enum) {
          const { enumVals, enumTitles } = transformEnums(propVal.enum);
          transformedSchema.properties[propKey].enum = enumVals;
          transformedSchema.properties[propKey].enum_titles = enumTitles;
        }
        else if (has(propVal, '$ref')) {
          transformedSchema.properties[propKey] = getDefinitionSchemaFromRef(
            transformedSchema.definitions,
            schema.properties[propKey],
            data[propKey],
          );
        }
        else if (has(propVal, 'items')) {
          if (has(propVal, 'items.$ref')) {
            transformedSchema.properties[propKey].items = {
              ...getDefinitionSchemaFromRef(
                transformedSchema.definitions,
                transformedSchema.properties[propKey].items,
                data[propKey],
              ),
            };
          }

          if (has(propVal, 'items.enum')) {
            const { enumVals, enumTitles } = transformEnums(propVal.items.enum);
            transformedSchema.properties[propKey].items.enum = enumVals;
            transformedSchema.properties[
              propKey
            ].items.enum_titles = enumTitles;
          }
        }
      });
    }
  });
  return transformedSchema;
};

export default transformSchema;
