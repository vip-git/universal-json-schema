// import Input, { InputLabel } from '@material-ui/core/Input'; // eslint-disable-line import/no-named-default
import has from 'lodash/has';
import getComponentProps from './get-component-props';
import getLabelComponentProps from './get-label-component-props';
import getLabelComponent from './get-label-component';
import getComponent from './get-component';

const getClassName = ({ uiSchema = {} }) => {
  const widget = uiSchema['ui:widget'];
  return widget === 'textarea' ? 'textarea' : null;
};

export default (props) => {
  const { schema, uiSchema = {}, components } = props;
  const title = uiSchema['ui:title'] || schema.title;
  const component = (schema && has(schema, 'component')) && schema.component;
  const isCustomComponent = (component 
      && components 
      && has(components, component)
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
