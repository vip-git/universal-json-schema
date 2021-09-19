// Library
import React from 'react';
import isEmpty from 'lodash/isEmpty';

// Material UI
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import ActiveComp from '@mui/icons-material/FiberManualRecord';

// Styles
import fieldStyles from './field-styles';

// Types
import { ConfiguredFieldProps } from '../types/ConfiguredField.type';

const classNames = require('classnames');

// for unit testing only
export const RawConfiguredField = ({
  widget,
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
  const newLabel = widget === 'radio' ? classes.radioLabel : classes.normalLabel;
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
					className={descriptionText ? classes.customLabel : newLabel}
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
			title={title}
			{...componentProps}
		/>
		{helpText && !isCustomComponent && (
			<FormHelperText 
				error={!isEmpty(hasInlineError) || undefined} 
				id={`${id}-help`}
				style={{ marginLeft: 0, marginRight: 0 }}
			>
				{helpText}
			</FormHelperText>
		)}
	</FormRoot>
  );
};

export default RawConfiguredField;
