// Library
import React from 'react';
import isEmpty from 'lodash/isEmpty';

// Material UI
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import ActiveComp from '@material-ui/icons/FiberManualRecord';

// Styles
import fieldStyles from './field-styles';

// Types
import { ConfiguredFieldProps } from '../types/ConfiguredField.type';

const classNames = require('classnames');

// for unit testing only
export const RawConfiguredField = ({
  data,
  type,
  descriptionText,
  activeCompColor,
  helpText,
  Component = Input,
  LabelComponent,
  labelComponentProps = {},
  title,
  className,
  componentProps = {},
  id,
  htmlid,
  isHidden,
  isCustomComponent: hasCustomComponent,
  hasError,
  hasInlineError,
}: ConfiguredFieldProps) => {
  const isCustomComponent = type === 'null' || hasCustomComponent;
  const classes = fieldStyles();
  const FormRoot = isCustomComponent ? FormGroup : FormControl;
  const isXHRNotImplemented = componentProps?.xhrSchema?.onload 
							&& !componentProps?.xhrSchema?.onload?.xhrComplete 
							&& !componentProps?.xhrSchema?.onload?.xhrProgress;

  React.useEffect(() => {
    if (isXHRNotImplemented) {
      componentProps.onXHRSchemaEvent(componentProps?.xhrSchema.onload['xhr:datasource'], 'onload');
    }
  }, [componentProps, isXHRNotImplemented]);
  
  return (
	<FormRoot
		id={`${htmlid}-formControl`}
		className={classNames(classes.root, { [classes.withLabel]: LabelComponent })}
		style={{ display: isHidden ? 'none' : 'flex', flexDirection: activeCompColor ? 'row' : 'column' }}
	>
		{
			LabelComponent && title && !isCustomComponent && (
				<LabelComponent
					id={`${htmlid}-labelControl`}
					className={descriptionText ? classes.customLabel : classes.normalLabel}
					style={activeCompColor ? { left: 41, top: -8 } : {}}
					{...labelComponentProps}
				>
					{title}
				</LabelComponent>
			)
		}
		{descriptionText && !isCustomComponent && (
			<p className={classes.description}>{descriptionText}</p>
		)}
		{activeCompColor && !isCustomComponent && (
			<div
                style={{
                  flexBasis: '6%',
                  top: 7,
                  position: 'relative',
                  marginRight: 10,
                  color: activeCompColor || 'grey',
                }}
			>
				<ActiveComp
					id={`${htmlid}-activeComp`}
				/>
			</div>
		)}
		<Component
			className={className && classes[className]}
			value={data}
			type={type}
			error={!isEmpty(hasError) || undefined}
			{...componentProps}
		/>
		{helpText && !isCustomComponent && (
			<FormHelperText 
				error={!isEmpty(hasInlineError) || undefined} 
				id={`${id}-help`}
			>
				{helpText}
			</FormHelperText>
		)}
	</FormRoot>
  );
};

export default RawConfiguredField;
