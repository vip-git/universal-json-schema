// Library
import React from 'react';
import isEmpty from 'lodash/isEmpty';

// UI
import Framework from '@universal-schema/framework';

const {
  wrapperComponents: {
	FormControl,
    FormGroup,
    FormHelperText,
	ActiveComp,
  },
  components: {
	string: {
	   Input,
	}
  },
  styles: {
    FieldStyles: fieldStyles
  }
} = Framework.uiFramework;

// Types
import { ConfiguredFieldProps } from '@core-types/ConfiguredField.type';

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
