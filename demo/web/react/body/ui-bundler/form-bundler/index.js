// Library
import { nanoid as generate } from 'nanoid';

// JSON
import schema from './schema.json';
import uiSchema from './ui-schema.json';
import xhrSchema from './xhr-schema.json';
import formData from './form-data.json';
import config from '../../../../../../scripts/generator/frameworks/react/mui/components.json';

const sessionId = generate();

formData.SelectComponents = {
  sessionId,
};
formData.PublishPackage = {
  sessionId,
};
formData.SelectComponents.listOfComponents = [];
formData.SelectComponents.listOfInterceptors = [];
formData.SelectComponents.listOfUtils = [];

Object.keys(config.interceptors).forEach((interceptor) => {
  schema.definitions.componentsList.dependencies.selectTheme.oneOf[1].properties.listOfInterceptors.items.enum.push(
    {
      key: config.interceptors[interceptor].name,
      value: config.interceptors[interceptor].name,
      disabled: config.interceptors[interceptor].isRequired,
    },
  );

  if (config.interceptors[interceptor].isRequired) {
    formData.SelectComponents.listOfInterceptors.push(
      config.interceptors[interceptor].name,
    );
  }
});

Object.keys(config.utils).forEach((util) => {
  /**
   * Todo: add support for component utils to be selected automatically and disabled
   */
  schema.definitions.componentsList.dependencies.selectTheme.oneOf[1].properties.listOfUtils.items.enum.push(
    {
      key: config.utils[util].name,
      value: config.utils[util].name,
      disabled: config.utils[util].isRequired,
    },
  );
  
  if (config.utils[util].isRequired) {
    formData.SelectComponents.listOfUtils.push(config.utils[util].name);
  }
});
  
Object.keys(config.components).forEach((comp) => {
  const compEnums = schema
    .definitions
    .componentsList
    .dependencies
    .selectTheme.oneOf[1]
    .properties
    .listOfComponents
    .items
    .enum;

  const compEnumVal = {
    key: config.components[comp].name,
    value: config.components[comp].name,
    disabled:
      config.components[comp].isDefault || config.components[comp].isRequired,
  };

  if (config.components[comp]?.utils) {
    // Todo: Covert this to rules.json
    compEnumVal.onData = {
      equals: config.components[comp].name,
      adds: {
        listOfUtils: [],
      },
    };
    config.components[comp].utils.forEach((cu) => {
      const cUtils = config.utils[cu];
      compEnumVal.onData.adds.listOfUtils.push(cUtils.name);
    });
  }

  compEnums.push(compEnumVal);

  if (config.components[comp].isDefault || config.components[comp].isRequired) {
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
