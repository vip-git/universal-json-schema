// Library
import React from 'react';
import configureComponent from './configure';
import ConfiguredField from './ConfiguredField';

// Types
import { FieldProps } from '@core-types/Field.type';

export default (props: FieldProps) => {
  const { path, prefixId, schema, data, uiSchema, validation } = props;
  const { type } = schema;
  const htmlid = `${prefixId}_${path}`;
  const {
    Component,
    LabelComponent,
    componentProps,
    labelComponentProps,
    className,
    title,
    isCustomComponent,
  } = configureComponent({ ...props, htmlid });

  const options = uiSchema['ui:options'] || uiSchema['ui:props'];
  const descriptionText = uiSchema && uiSchema['ui:description'];
  const activeCompColor = uiSchema && uiSchema['ui:activeCompColor'];
  const hasInlineError = validation && validation.length && validation.find((vd) => vd.inline === true);
  const helpText = hasInlineError ? hasInlineError.message : uiSchema && uiSchema['ui:help'];
  const isHidden = (uiSchema && uiSchema['mui:type'] === 'hidden') || (options?.type === 'hidden');
  return (
		<ConfiguredField
			id={prefixId}
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
      hasError={validation && validation.length}
      hasInlineError={hasInlineError}
		/>
  );
};
