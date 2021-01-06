// Library
import get from 'lodash/get';
import find from 'lodash/find';

const getDefinitionSchemaFromRef = (
  givenDefinitions,
  schemaProperties,
  formData,
) => {
  const definitions = { ...givenDefinitions };
  const definitionSchema = { 
    ...get(
      definitions,
      schemaProperties.$ref.replace('#/definitions/', '').replace('/', '.'),
    ), 
  };

  if (
    definitionSchema.dependencies
  ) {
    Object.keys(definitionSchema.properties).forEach((propId) => {
      const propIdValue = formData[propId];
      if (definitionSchema.dependencies[propId]) {
        const conditionals = definitionSchema.dependencies[propId].oneOf
          || definitionSchema.dependencies[propId].anyOf;
        const conditionalSchemaProps = find(conditionals, [
          `properties.${propId}.const`,
          propIdValue,
        ]);
        if (definitionSchema.properties) {
          definitionSchema.properties = {
            ...conditionalSchemaProps.properties,
            ...definitionSchema.properties,
          };
        }
      }
    });
  }

  return {
    ...schemaProperties,
    ...definitionSchema,
  };
};

export default getDefinitionSchemaFromRef;
