import schema from './schema.json';
import uiSchema from './ui-schema.json';
import xhrSchema from './xhr-schema.json';
import formData from './form-data.json';
import config from '../../../../generator/components.json';

formData.SelectComponents = {};
formData.SelectComponents.listOfComponents = [];
formData.SelectComponents.listOfInterceptors = [];
formData.SelectComponents.listOfUtils = [];

Object.keys(config.interceptors).forEach((interceptor) => {
  schema
    .definitions
    .componentsList
    .dependencies
    .selectTheme.oneOf[1]
    .properties
    .listOfInterceptors
    .items
    .enum.push(
      {
        key: config.interceptors[interceptor].name,
        value: config.interceptors[interceptor].name,
      },
    );
});

Object.keys(config.utils).forEach((util) => {
  schema
    .definitions
    .componentsList
    .dependencies
    .selectTheme.oneOf[1]
    .properties
    .listOfUtils
    .items
    .enum.push(
      {
        key: config.utils[util].name,
        value: config.utils[util].name,
      },
    );
});
  
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
