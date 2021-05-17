// Library
const get = require('lodash/get');
const find = require('lodash/find');
const omit = require('lodash/omit');

export const flattenDefinitionSchemaFromRef = (
  givenDefinitions,
  schemaProperties,
) => {
  try {
    const definitions = { ...givenDefinitions };
    const definitionSchema = {
      ...get(
        definitions,
        schemaProperties.$ref.replace('#/definitions/', '').replace('/', '.'),
      ),
    };
    if (definitionSchema.dependencies) {
      Object.keys(definitionSchema.properties).forEach((propId) => {
        const finalMerge = { dependencies: {} };
        if (definitionSchema.dependencies[propId]) {
          const conditionals = definitionSchema.dependencies[propId].oneOf
            || definitionSchema.dependencies[propId].anyOf;
          conditionals.forEach((cond) => {
            finalMerge.dependencies = {
              ...finalMerge.dependencies,
              ...cond.properties,
            };
          });
          definitionSchema.properties = {
            ...finalMerge.dependencies,
            ...definitionSchema.properties,
          };
        }
      });
    }

    return {
      ...schemaProperties,
      title: schemaProperties.title || definitionSchema.title,
      ...omit(definitionSchema, ['dependencies']),
    };
  }
  catch (err) {
    // console.log('error found', err);
    return {
      ...schemaProperties,
      title: schemaProperties.title,
    };
  }
};

const getDefinitionSchemaFromRef = (
  givenDefinitions,
  schemaProperties,
  formData,
) => {
  try {
    const definitions = { ...givenDefinitions };
    const definitionSchema = {
      ...get(
        definitions,
        schemaProperties.$ref.replace('#/definitions/', '').replace('/', '.'),
      ),
    };
    if (definitionSchema.dependencies) {
      Object.keys(definitionSchema.properties).forEach((propId) => {
        const propIdValue = formData && formData[propId];
        if (definitionSchema.dependencies[propId]) {
          const conditionals = definitionSchema.dependencies[propId].oneOf
            || definitionSchema.dependencies[propId].anyOf;
          const conditionalSchemaProps = find(conditionals, [
            `properties.${propId}.const`,
            propIdValue,
          ]);
          if (definitionSchema.properties) {
            definitionSchema.properties = conditionalSchemaProps
              ? {
                ...conditionalSchemaProps.properties,
                ...definitionSchema.properties,
              }
              : {
                ...definitionSchema.properties,
              };
          }
        }
      });
    }

    return {
      ...schemaProperties,
      title: schemaProperties.title || definitionSchema.title,
      ...omit(definitionSchema, ['dependencies']),
    };
  }
  catch (err) {
    // console.log('error found', err);
    return {
      ...schemaProperties,
      title: schemaProperties.title,
    };
  }
};

export default getDefinitionSchemaFromRef;
