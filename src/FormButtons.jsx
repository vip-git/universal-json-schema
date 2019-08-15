import React from "react";
import classNames from "classnames";
import Button from "@material-ui/core/Button";

export class RawFormButtons extends React.Component {
  render() {
    const {
      classes,
      onCancel,
      onSubmit,
      submitValue,
      disabled,
      cancelVariant,
      submitVariant
    } = this.props;
    return (
      (onCancel || onSubmit) && (
        <div className={classes.formButtons}>
          {onCancel && (
            <Button
              className={classNames(classes.cancel, classes.button)}
              variant={cancelVariant || "outlined"}
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          {onSubmit && (
            <Button
              className={classNames(classes.submit, classes.button)}
              variant={submitVariant || "contained"}
              color={"primary"}
              onClick={onSubmit}
              disabled={disabled}
            >
              {submitValue || "Submit"}
            </Button>
          )}
        </div>
      )
    );
  }
}

export default RawFormButtons;
