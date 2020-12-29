import getComponentProps from './component/get-component-props';
import getLabelComponentProps from './label/get-label-component-props';
import getLabelComponent from './label/get-label-component';
import getComponent from './component/get-component';

const getClassName = ({ uiSchema = {} }) => {
  const widget = uiSchema['ui:widget'];
  return widget === 'textarea' ? 'textarea' : null;
};

export default (props) => {
  const { schema, uiSchema = {}, components } = props;
  const title = uiSchema['ui:title'] || schema.title;
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

  return {
    title,
    className: getClassName(props),
    Component: getComponent(props),
    componentProps: getComponentProps(props),
    LabelComponent: title && getLabelComponent(props),
    labelComponentProps: getLabelComponentProps(props),
    isCustomComponent,
  };
};
