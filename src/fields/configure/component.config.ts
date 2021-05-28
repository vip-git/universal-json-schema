// Config
import {
  APP_CONFIG,
} from '../../generated/app.config';

const {
  COMPONENTS: {
    SUPPORTED_TYPES, 
    COMPONENT_MAPPING,
  },
} = APP_CONFIG;

const componentConfig = new Map();

componentConfig.set('custom', 
  (component, components) => component
    && components
    && component in components
    && typeof components[component] === 'function'
    && components[component],
);

Object.keys(COMPONENT_MAPPING).forEach((dataType) => {
  const dataTypeValue = new Map();
  
  Object.keys(COMPONENT_MAPPING[dataType]).forEach((componentInfoKey) => {
    const componentInfo = COMPONENT_MAPPING[dataType][componentInfoKey];
    dataTypeValue.set(componentInfo.name, componentInfo.component);
  });
  
  componentConfig.set(SUPPORTED_TYPES[dataType], dataTypeValue);
});

export default componentConfig;
