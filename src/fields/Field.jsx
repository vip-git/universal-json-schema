import React from 'react';
import configureComponent from './configure';
import ConfiguredField from './ConfiguredField';

export default (props) => {
  const { path, id, schema, data, uiSchema } = props;
  const { type } = schema;
  const htmlid = `${id}_${path}`;
  const {
    Component, LabelComponent, componentProps, labelComponentProps, className, title,
  } = configureComponent({ ...props, htmlid });

  const descriptionText = uiSchema['ui:description'];
  const activeCompColor = uiSchema['ui:activeCompColor'];
  const helpText = uiSchema['ui:help'];
  return (
    <ConfiguredField
      id={id}
      className={className}
      data={data}
      type={type}
      Component={Component}
      componentProps={componentProps}
      LabelComponent={LabelComponent}
      labelComponentProps={labelComponentProps}
      title={title}
      activeCompColor={activeCompColor}
      descriptionText={descriptionText}
      helpText={helpText}
    />
  );
};
