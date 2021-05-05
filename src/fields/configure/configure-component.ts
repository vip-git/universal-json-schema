import getComponentProps from './component/get-component-props';
import getLabelComponentProps from './label/get-label-component-props';
import getLabelComponent from './label/get-label-component';
import getComponent from './component/get-component';

// Interceptors
const {
  APP_CONFIG: {
    INTERCEPTORS: {
      INTERCEPTOR_CONFIG,
    },
  },
} = require('../../generated/app.config');

const getClassName = ({ uiSchema = {} }) => {
  const widget = uiSchema['ui:widget'];
  return widget === 'textarea' ? 'textarea' : null;
};

export default (props) => {
  const { schema, uiSchema = {}, components, dynamicKeyField } = props;
  const dynamicKeyFieldTitle = dynamicKeyField
                               && uiSchema['ui:title']
                               && uiSchema['ui:title'][dynamicKeyField];
  const title = dynamicKeyFieldTitle || dynamicKeyField || uiSchema['ui:title'] || schema.title;
  const backwardsCompatibleComponent = (schema && 'component' in schema) && schema.component;
  const newComponent = uiSchema['ui:component'];
  const component = backwardsCompatibleComponent || newComponent;
  const isCustomComponent = (component 
      && components 
      && component in components 
      && components[component]) 
      || false;
      
  if (isCustomComponent && typeof isCustomComponent === 'function') {
    // eslint-disable-next-line no-param-reassign
    props.isCustomComponent = isCustomComponent;
  }

  Object.keys(INTERCEPTOR_CONFIG).forEach((ic) => {
    // eslint-disable-next-line no-param-reassign
    props.interceptors = props.interceptors
      ? {
        [ic]: INTERCEPTOR_CONFIG[ic].interceptor,
        ...props.interceptors,
      }
      : {
        [ic]: INTERCEPTOR_CONFIG[ic].interceptor,
      };
  });

  const isValidTitle = typeof title === 'string';

  return {
    title: isValidTitle ? title : '',
    className: getClassName(props),
    Component: getComponent(props),
    componentProps: getComponentProps(props),
    LabelComponent: isValidTitle && title && getLabelComponent(props),
    labelComponentProps: getLabelComponentProps(props),
    isCustomComponent,
  };
};
