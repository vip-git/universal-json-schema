// Library
import React from 'react';
import { FieldProps } from '@core-types/Field.type';
import configureComponent from './configure';
import ConfiguredField from './ConfiguredField';

// Helpers
import {
  getHashCodeFromXHRDef,
} from '@helpers/state-machine/form/hooks';

export default (props: FieldProps) => {
  const { path, prefixId, schema, data, uiSchema, validation, xhrProgress } = props;
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

  const widget = uiSchema['ui:widget'];
  const options = uiSchema['ui:options'] || uiSchema['ui:props'];
  const descriptionText = uiSchema && uiSchema['ui:description'];
  const activeCompColor = uiSchema && uiSchema['ui:activeCompColor'];
  const hasInlineError = validation && validation.length && validation.find((vd) => vd.inline === true);
  const helpText = hasInlineError ? hasInlineError.message : uiSchema && uiSchema['ui:help'];
  const isHidden = (uiSchema && uiSchema['mui:type'] === 'hidden') || (options?.type === 'hidden');
  const hashRef = getHashCodeFromXHRDef({
    eventName: 'onload',
    xhrSchema: componentProps?.xhrSchema,
  });

  if (componentProps?.xhrSchema?.onload && !Object.keys(xhrProgress).includes(hashRef.toString())) {
    componentProps.onXHRSchemaEvent(componentProps?.xhrSchema.onload['xhr:datasource'], 'onload');
  }

  if (hashRef && xhrProgress && xhrProgress[hashRef]) {
    /** Todo: should be replaced with xhr loading variant of component */
    return <div style={{ padding: 15 }}> Loading... </div>;
  }

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
      widget={widget}
		/>
  );
};
