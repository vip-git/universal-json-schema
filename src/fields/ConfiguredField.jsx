/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable max-len */
import React from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import ActiveComp from '@material-ui/icons/FiberManualRecord';
import fieldStyles from './field-styles';

// for unit testing only
export const RawConfiguredField = React.memo(({
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
  isCustomComponent,
  hasError,
  hasInlineError,
}) => {
  const classes = fieldStyles();
  const FormRoot = isCustomComponent ? FormGroup : FormControl;
  return (
	<FormRoot
		id={`${htmlid}-formControl`}
		className={classNames(classes.root, {
		  [classes.withLabel]: LabelComponent,
		})}
		style={{ 
		  display: isHidden ? 'none' : 'flex',
		  flexDirection: activeCompColor ? 'row' : 'column',
		  flexBasis: '100%',
		}}
	>
		{
			LabelComponent && title && !isCustomComponent && (
				<LabelComponent
					id={`${htmlid}-labelControl`}
					style={{
					  left: 10,
					}}
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
			<FormHelperText error={!isEmpty(hasInlineError) || undefined} id={`${id}-help`}>{helpText}</FormHelperText>
		)}
	</FormRoot>
  );
}, (prevProps, nextProps) => isEqual(prevProps.data, nextProps.data) 
							&& isEqual(prevProps.schema, nextProps.schema)
							&& isEqual(prevProps.uiSchema, nextProps.uiSchema),
);

export default RawConfiguredField;
