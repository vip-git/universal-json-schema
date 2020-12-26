/* eslint-disable no-fallthrough */
/* eslint-disable no-tabs */
/* eslint-disable max-len */
// import Input, { InputLabel } from '@material-ui/core/Input'; // eslint-disable-line import/no-named-default
const Input = require('@material-ui/core/Input').default;
const componentConfig = require('./component.config').default;
const {
  APP_CONFIG: {
    V2_DEPRECATED_TYPES,
    V2_DEPRECATED_OPTIONS,
    V2_DEPRECATED_ENUMS,
    V2_DEPRECATED_CREATABLE_ENUMS,
    V2_DEPRECATED_PICKERS,
    SUPPORTED_TYPES: { STRING },
  },
  ENUM_COMPONENTS,
  V2_PICKER_COMPONENT,
} = require('../generated/app.config');

export default ({ schema, uiSchema = {}, components, schemaVersion }) => {
  // console.log('getComponent schema: %o, uiSchema: %o', schema, uiSchema);
  const widget = uiSchema['ui:widget'];
  const options = uiSchema['ui:options'];
  const newComponent = uiSchema['ui:component'];
  const { type, component: backwardsCompatibleComponent } = schema;
  const component = backwardsCompatibleComponent || newComponent;
  const dataType = V2_DEPRECATED_TYPES.includes(type) ? STRING : type;
  const getDefaultComponent = (isEnum) => (isEnum ? 'DEFAULT_ENUM' : 'DEFAULT');
  const transformVersion2FormWidgets = (givenSchema, givenType, widgetString) => {
    if (
      givenSchema.enum
      && V2_DEPRECATED_ENUMS.includes(widgetString)
    ) {
      return ENUM_COMPONENTS.REACT_SELECT.name;
    }

    if (
      givenSchema.enum
       && V2_DEPRECATED_CREATABLE_ENUMS.includes(widgetString)
    ) {
      return ENUM_COMPONENTS.CREATABLE_REACT_SELECT.name;
    }

    if (V2_DEPRECATED_PICKERS.includes(givenType)) {
      return V2_PICKER_COMPONENT.MATERIAL_PICKER.name;
    }

    if (V2_DEPRECATED_TYPES.includes(givenType)) {
      return givenType;
    }
    
    return (V2_DEPRECATED_OPTIONS.includes(options) && options)
          || widgetString
          || getDefaultComponent(givenSchema.enum);
  };

  const formWidget = !schemaVersion || String(schemaVersion) === '2'
    ? transformVersion2FormWidgets(schema, type, widget)
    : widget || getDefaultComponent(schema.enum);

  try {
    const selectedComponent = componentConfig.get(dataType).get(formWidget)
      || componentConfig.get(dataType).get(getDefaultComponent(schema.enum));
      
    if (
      component
        && components
        && component in components
        && typeof components[component] === 'function'
    ) {
      return components[component];
    }

    if (selectedComponent) {
      return selectedComponent;
    }

    return Input;
  }
  catch (err) {
    return Input;
  }
};
