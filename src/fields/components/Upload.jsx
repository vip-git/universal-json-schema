/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// internal
import { UploadContext } from '../../Form';

let uploadLabel = null;

const doOnChange = (onChange, onUpload) => (event: any) => {
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

const UploadButton = ({ path, classes, label, value, buttonType, isMulti, acceptValues, buttonIcon, buttonTitle, type, onChange, ...rest }) => (
    <UploadContext.Consumer>
        {onUpload => (
            <FormControlLabel
                control={
                    <React.Fragment>
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
                            <Icon style={{
                                marginRight: 5,
                            }}
                            >
                                {buttonIcon}
                            </Icon>
                            {buttonTitle}
                        </Button>
                    </React.Fragment>
                }
                label={uploadLabel || label}
                className={classes.labelDescription}
            />
        )}
    </UploadContext.Consumer>
);

export default withStyles(styles)(UploadButton);
