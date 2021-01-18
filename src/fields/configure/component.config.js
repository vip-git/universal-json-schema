/* eslint-disable no-tabs */
// Config
const {
  APP_CONFIG: { SUPPORTED_TYPES, COMPONENT_MAPPING },
} = require('../../generated/components');

const componentConfig = new Map();

componentConfig.set('custom', (component, components) => component
		&& components
		&& component in components
		&& typeof components[component] === 'function'
		&& components[component]);

Object.keys(COMPONENT_MAPPING).forEach((dataType) => {
  const dataTypeValue = new Map();
  
  Object.keys(COMPONENT_MAPPING[dataType]).forEach((componentInfoKey) => {
    const componentInfo = COMPONENT_MAPPING[dataType][componentInfoKey];
    dataTypeValue.set(componentInfo.name, componentInfo.component);
  });
  
  componentConfig.set(SUPPORTED_TYPES[dataType], dataTypeValue);
});

export default componentConfig;
