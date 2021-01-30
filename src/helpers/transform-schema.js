// Library
import { has, get } from 'lodash';
import each from 'lodash/each';

// Helpers
import getDefinitionSchemaFromRef from './get-definition-schema';

export const hashCode = (s) => {
  let h = 0; const l = s.length; let 
    i = 0;
  // eslint-disable-next-line no-bitwise
  if (l > 0) while (i < l) h = (h << 5) - h + s.charCodeAt(i++) | 0;
  return h;
};

const translateTemplateString = (str, obj) => {
  const parts = str.split(/\$\{(?!\d)[\wæøåÆØÅ]*\}/);
  const args = str.match(/[^{}]+(?=})/g) || [];
  const parameters = args.map(
    (argument) => obj[argument] || (obj[argument] === undefined ? '' : obj[argument]),
  );
  return String.raw({ raw: parts }, ...parameters);
};

export const mapData = (
  mappingInfo,
  xhrData,
  data,
  iniUiData,
  uiSchema,
  schema,
  onChange,
  onError,
  setData,
) => {
  const returnData = { ...data };
  const returnUIData = { ...iniUiData };
  const { formData, uiData } = mappingInfo;
  Object.keys(formData).forEach((fd) => {
    returnData[fd] = translateTemplateString(formData[fd], xhrData);
  });
  Object.keys(uiData).forEach((fd) => {
    returnUIData[fd] = translateTemplateString(uiData[fd], xhrData);
  });
  setData(returnData, returnUIData, uiSchema, schema, onChange, onError);
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
