// Library
import each from 'lodash/each';

const transformSchema = (schema) => {
  const transformedSchema = JSON.parse(JSON.stringify(schema));

  const notAllowedTypes = ['upload', 'material-date'];
  each(transformedSchema, (givenValue, key) => {
    if (key === 'properties') {
      each(givenValue, (propVal, propKey) => {
        if (notAllowedTypes.includes(propVal.type)) {
          transformedSchema.properties[propKey].type = 'string';
        }
        if (propVal.enum) {
          transformedSchema.properties[propKey].enum = [];
          transformedSchema.properties[propKey].enum_titles = [];
          each(propVal.enum, (enumVal) => {
            if (enumVal.key) {
              transformedSchema.properties[propKey].enum.push(enumVal.key);
              transformedSchema.properties[propKey].enum_titles.push(enumVal.key);
            }
            else {
              transformedSchema.properties[propKey].enum.push(enumVal);
              transformedSchema.properties[propKey].enum_titles.push(enumVal);
            }
          });
        }
      });
    }
  });

  return transformedSchema;
};

export default transformSchema;
