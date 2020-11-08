/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import configureComponent from './configure';
import ConfiguredField from './ConfiguredField';

export default (props) => {
  const { path, id, schema, data, uiSchema } = props;
  const { type } = schema;
  const htmlid = `${id}_${path}`;
  const {
    Component, 
    LabelComponent, 
    componentProps, 
    labelComponentProps, 
    className, 
    title, 
    isCustomComponent,
  } = configureComponent({ ...props, htmlid });

  const descriptionText = uiSchema && uiSchema['ui:description'];
  const activeCompColor = uiSchema && uiSchema['ui:activeCompColor'];
  const helpText = uiSchema && uiSchema['ui:help'];
  const isHidden = uiSchema && uiSchema['mui:type'] === 'hidden';
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
			htmlid={htmlid}
			isHidden={isHidden}
		  isCustomComponent={isCustomComponent}
		/>
  );
};
