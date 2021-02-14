import schema from './schema.json';
import uiSchema from './ui-schema.json';
import formData from './form-data.json';
import config from '../../../../generator/components.json';

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
      config.components[comp].name,
    );
});

export default ({
  title: 'Steps UI',
  schema,
  uiSchema,
  formData,
});
