import schema from './schema.json';
import uiSchema from './ui-schema.json';
import xhrSchema from './xhr-schema.json';
import formData from './form-data.json';
import config from '../../../../generator/components.json';

formData.SelectComponents = {};
formData.SelectComponents.listOfComponents = [];
  
Object.keys(config.components).forEach((comp) => {
  schema
    .definitions
    .componentsList
    .dependencies
    .selectTheme.oneOf[1]
    .properties
    .listOfComponents
    .items
    .enum.push(
      {
        key: config.components[comp].name,
        value: config.components[comp].name,
        disabled: config.components[comp].isDefault,
      },
    );

  if (config.components[comp].isDefault) {
    formData.SelectComponents.listOfComponents.push(
      config.components[comp].name,
    );
  }
});

export default {
  title: 'Steps UI',
  schema,
  uiSchema,
  formData,
  xhrSchema,
};
