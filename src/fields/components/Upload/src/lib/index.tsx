/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import FormControlLabel from '@mui/material/FormControlLabel';

/** Todo: fix - this is the place where label sticks sometimes */
let uploadLabel = null;

const doOnChange = (onChange, onUpload) => (event) => {
  const file = event.target.files[0];
  uploadLabel = file.name;
  if (onUpload) {
    onUpload(file);
  }
  return onChange(uploadLabel);
};

const styles = {
  labelDescription: {
    '&>span+span': {
      maxWidth: 200,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
};

const UploadButton = ({
  classes,
  label,
  value,
  buttonType,
  isMulti,
  acceptValues,
  buttonIcon,
  buttonTitle,
  type,
  onChange,
  EventContext,
  ...rest
}) => (
	<EventContext.Consumer>
		{(onUpload) => (
			<FormControlLabel
				control={(
                    <div>
						<input
							accept={acceptValues}
							id='button-file'
							style={{
							  display: 'none',
							}}
							multiple={isMulti}
							type='file'
							onChange={doOnChange(onChange, onUpload)}
						/>
						<Button
							style={{
							  marginRight: 10,
							}}
							variant={buttonType}
							component='span'
						>
							<Icon
								style={{
								  marginRight: 5,
								}}
							>
								{buttonIcon}
							</Icon>
							{buttonTitle}
						</Button>
                    </div>
   				)}
				label={uploadLabel || label}
				className={classes.labelDescription}
			/>
		)}
	</EventContext.Consumer>
);

export default withStyles(styles)(UploadButton);
