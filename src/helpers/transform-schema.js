// Library
import { has, get, set } from 'lodash';
import each from 'lodash/each';

// Helpers
import getDefinitionSchemaFromRef from './get-definition-schema';

// Interceptors
const {
  APP_CONFIG: { 
    INTERCEPTORS: {
      INTERCEPTOR_CONFIG,
    }, 
  },
} = require('../generated/app.config');

export const hashCode = (s) => {
  let h = 0; const l = s.length; let 
    i = 0;
  // eslint-disable-next-line no-bitwise
  if (l > 0) while (i < l) h = (h << 5) - h + s.charCodeAt(i++) | 0;
  return h;
};

const translateTemplateString = (str, obj, type) => {
  if (obj) {
    const parts = str.split(/\$\{(?!\d)[\wæøåÆØÅ\-_.]*\}/);
    const args = str.match(/[^{}]+(?=})/g) || [];
    const parameters = args.map(
      (argument) => get(obj, argument)
        || (get(obj, argument) === undefined ? '' : get(obj, argument)),
    );
    /**
     * Case array is not working needs to be done properly
     * to get data from form data and then map it with array
     */
    switch (type) {
      case 'array':
      case 'object':
        return parameters[0];
      case 'integer':
      case 'number':
        return Number(parameters);
      case 'boolean':
        return parameters[0] === 'true';
      default:
        return String.raw({ raw: parts }, ...parameters);
    }
  }
  return obj;
};

export const setNestedPayload = ({
  payloadData,
  formData: givenFormData,
  schemaProps,
  schemaDefs,
  parentData,
  previousPayload,
  extraKey,
}) => {
  const payload = previousPayload || {};
  const formData = Object.assign({}, givenFormData);
  Object.keys(payloadData).forEach((fd) => {
    const parseColonKey = (givenKey) => {
      // Colon includes a object refrence then use this logic
      // needs to be improved for nested object refrence if support is needed in future.
      const objectKeyFromPayload = givenKey.includes(':') && givenKey.split(':')[0].includes('.') && givenKey.split(':')[0].split('.')[0];
      const newKey = givenKey.includes(':') && objectKeyFromPayload && `${objectKeyFromPayload}.${givenKey.split(':')[1]}`;

      return givenKey.includes(':') ? newKey || givenKey.split(':')[1] : givenKey;
    }
    const objectKey = extraKey ? `${extraKey}.${fd}` : fd;
    const parsedObjectKey = extraKey
      ? `${parseColonKey(extraKey)}.${parseColonKey(fd)}`
      : fd;
    const payloadKey = parsedObjectKey.includes(':')
      ? parsedObjectKey.split(':')[1]
      : parsedObjectKey;
    const schemaKey = fd.includes(':') ? fd.split(':')[0] : fd;
    const orignalData = parentData || payloadData;
    const currentData = get(orignalData, objectKey);
    if (has(get(schemaProps, schemaKey), '$ref')) {
      set(
        schemaProps,
        schemaKey,
        getDefinitionSchemaFromRef(
          schemaDefs,
          get(schemaProps, schemaKey),
          currentData
        )
      );
    }
    const currentSchemaObj = get(schemaProps, schemaKey);
    if (currentData && typeof currentData === 'object') {
      setNestedPayload({
        payloadData: currentData,
        formData,
        schemaProps: currentSchemaObj.properties,
        parentData: orignalData,
        extraKey: objectKey,
        extraSchemaKey: schemaKey,
        extraPayloadKey: payloadKey,
        previousPayload: payload,
      });
    } else if (currentData && currentSchemaObj) {
      const value = translateTemplateString(
        currentData,
        formData,
        currentSchemaObj.type
      );
      set(payload, payloadKey, value);
    }
  });
  return payload;
};

export const getDefinitionsValue = (schema, definitionsRef) => get(
  schema, 
  definitionsRef.replace('#/', '').replace('/', '.'),
);

const setNestedData = ({
  formData,
  returnUIData,
  parentData,
  returnData,
  schemaProps,
  uiSchema,
  interceptors = {},
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
        interceptors,
        returnUIData,
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
        if (typeof getMethod === 'function') {
          const { formData: fData, uiData } = getMethod({
            value,
            uiValue,
            options,
          });
          set(returnData, objectKey, fData);
          set(returnUIData, objectKey, uiData);
        }
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
        if (has(transformedSchema.properties[propKey], 'properties')) {
          transformedSchema.properties[propKey] = transformSchema(
            transformedSchema.properties[propKey],
          );
        }

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
