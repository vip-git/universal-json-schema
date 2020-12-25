/* eslint-disable no-tabs */
/* eslint-disable max-len */
// import Input, { InputLabel } from '@material-ui/core/Input'; // eslint-disable-line import/no-named-default
const Input = require('@material-ui/core/Input').default;
const componentConfig = require('./component.config').default;
const {
  APP_CONFIG: {
    V2_DEPRECATED_TYPES,
    V2_DEPRECATED_OPTIONS,
    SUPPORTED_TYPES: { STRING },
  },
} = require('../generated/app.config');

export default ({ schema, uiSchema = {}, components }) => {
  // console.log('getComponent schema: %o, uiSchema: %o', schema, uiSchema);
  const widget = uiSchema['ui:widget'];
  const options = uiSchema['ui:options'];
  const newComponent = uiSchema['ui:component'];
  const { type, component: backwardsCompatibleComponent } = schema;
  const component = backwardsCompatibleComponent || newComponent;
  const dataType = V2_DEPRECATED_TYPES.includes(type) ? STRING : type;
  const getDefaultComponent = (isEnum) => (isEnum ? 'DEFAULT_ENUM' : 'DEFAULT');
  // Todo: Remove this in v4 to be only  widget || getDefaultComponent(schema.enum)
  // Todo: Once removed this will be a breaking change to be strictly compliant to jsonSchema
  const formWidget = V2_DEPRECATED_TYPES.includes(type)
    ? type
    : (V2_DEPRECATED_OPTIONS.includes(options) && options) 
      || widget 
      || getDefaultComponent(schema.enum);
  
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
