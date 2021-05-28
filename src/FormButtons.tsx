/* eslint-disable react/state-in-constructor */
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const classNames = require('classnames');

export class RawFormButtons extends React.Component<any, any> {
  state = {
    inProgress: false,
  };

  render() {
    const { inProgress } = this.state;
    const { 
      classes, 
      onCancel, 
      onSubmit, 
      submitValue, 
      cancelValue,
      inProgressValue,
      disabled,
      cancelVariant,
      submitVariant,
      activityIndicatorEnabled,
    } = this.props;
    const canProgress = activityIndicatorEnabled && inProgress;
    return (onCancel || onSubmit) && (
      <div className={classes.formButtons}>
        {onCancel
          && (
            <Button
              className={classNames(classes.cancel, classes.button)}
              variant={cancelVariant || 'outlined'}
              onClick={onCancel}
              disabled={canProgress}
            >
              {cancelValue || 'Reset'}
            </Button>
          )}
        {onSubmit
          && (
          <Button
            className={classNames(classes.submit, classes.button)}
            variant={submitVariant || 'contained'}
            color={'primary'}
            onClick={() => this.setState({ 
              inProgress: true,
            }, () => onSubmit(
              () => this.setState({ inProgress: false }),
            ))}
            disabled={disabled || canProgress}
          >
          {canProgress 
          && (
            <CircularProgress
              size={24}
              style={{
                color: 'gray',
                width: 19,
                height: 19,
                marginRight: 10,
              }}
            />
          )}
          {(canProgress) ? inProgressValue || 'Processing...' : submitValue || 'Submit'}
          </Button>
          )}
      </div>
    );
  }
}

export default RawFormButtons;
