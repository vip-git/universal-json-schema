/* eslint-disable max-len */
import React from 'react';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import ActiveComp from '@material-ui/icons/FiberManualRecord';
import fieldStyles from './field-styles';

// for unit testing only
export class RawConfiguredField extends React.Component {
  shouldComponentUpdate = (nextProps) => !isEqual(this.props, nextProps)
  render() {
    const {
			classes = {},
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
			hasInlineError
		} = this.props;
	const FormRoot = isCustomComponent ? FormGroup : FormControl;
    return (
			<FormRoot
				id={`${htmlid}-formControl`}
				className={classNames(classes.root, {
					[classes.withLabel]: LabelComponent
				})}
				style={{ 
					display: isHidden ? 'none' : 'flex',
					flexDirection: activeCompColor ? 'row' : 'column'
				}}
			>
				{
					LabelComponent && title && !isCustomComponent && (
						<LabelComponent
							id={`${htmlid}-labelControl`}
							style={{
								left: 10
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
					<ActiveComp
						id={`${htmlid}-activeComp`}
						style={{
							flexBasis: '6%',
							top: 22,
							position: 'relative',
							marginRight: 10,
							color: activeCompColor || 'grey'
						}}
					/>
				)}
				<Component
					className={className && classes[className]}
					value={data}
					type={type}
					error={hasError && true || undefined}
					{...componentProps}
				/>
				{helpText && !isCustomComponent && (
					<FormHelperText error={hasInlineError && true || undefined} id={`${id}-help`}>{helpText}</FormHelperText>
				)}
			</FormRoot>
		);
  }
}
export default withStyles(fieldStyles)(RawConfiguredField);
