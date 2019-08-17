/* eslint-disable max-len */
// Library
import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import isEqual from 'lodash/isEqual';
import { generate } from 'shortid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Internal
import formStyles from './form-styles';
import FormField from './FormField';
import updateFormData, { addListItem, removeListItem, moveListItem } from './helpers/update-form-data';
import getValidationResult from './helpers/validation';
import ValidationMessages from './ValidationMessages';
import FormButtons from './FormButtons';

export const UploadContext = React.createContext('upload');

class Form extends React.Component {
  state = {
    data: this.props.formData,
    validation: getValidationResult(this.props.schema, this.props.formData),
    id: this.props.prefixId || generate(),
  }
  componentWillReceiveProps = (nextProps) => {
    let validation;
    if (!isEqual(nextProps.schema, this.props.schema)) {
      validation = {};
    }
    else {
      validation = getValidationResult(this.props.schema, nextProps.formData);
    }
    this.setState({
      validation,
      data: nextProps.formData,
    });
  }

  onChange = field => (value) => {
    const data = updateFormData(this.state.data, field, value);
    this.setState({
      data,
      validation: getValidationResult(this.props.schema, data),
    }, this.notifyChange);
  }
  onMoveItemUp = (path, idx) => () => {
    this.setState({ data: moveListItem(this.state.data, path, idx, -1) }, this.notifyChange);
  }
  onMoveItemDown = (path, idx) => () => {
    this.setState({ data: moveListItem(this.state.data, path, idx, 1) }, this.notifyChange);
  }
  onDeleteItem = (path, idx) => () => {
    this.setState({ data: removeListItem(this.state.data, path, idx) }, this.notifyChange);
  }
  onAddItem = (path, defaultValue) => () => {
    this.setState({ data: addListItem(this.state.data, path, defaultValue || '') }, this.notifyChange);
  }
  onSubmit = () => {
    this.props.onSubmit({ formData: this.state.data });
  }
  handleCreatableSelectInputChange = (inputValue) => {
    this.setState({ inputValue }, this.notifyChange);
  };
  notifyChange = () => {
    const { onChange } = this.props;
    const { data, inputValue, value } = this.state;
    if (onChange) {
      onChange({ formData: data, inputValue, value });
    }
  }
  render() {
    const { 
      classes, 
      formData, 
      onUpload,
      onSubmit, 
      formButtons, 
      actionButtonPos, 
      onChange, 
      onCancel, 
      submitValue, 
      disabled, 
      cancelVariant,
      submitVariant,
      ...rest 
    } = this.props;
    const { validation, id } = this.state;
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Paper className={classes.root}>
          {
            (actionButtonPos === 'top') ? 
                  <FormButtons 
                    onSubmit={this.onSubmit} 
                    submitValue={submitValue} 
                    disabled={disabled} 
                    onCancel={onCancel}
                    cancelVariant={cancelVariant}
                    submitVariant={submitVariant}
                    classes={classes} 
                  />
                  : null
            
          }
          <ValidationMessages validation={validation} />
          <UploadContext.Provider value={onUpload}>
            <FormField
                path={''}
                data={this.state.data}
                id={id}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                validation={validation}
                onMoveItemUp={this.onMoveItemUp}
                onMoveItemDown={this.onMoveItemDown}
                onDeleteItem={this.onDeleteItem}
                onAddItem={this.onAddItem}
                {...rest}
            />
          </UploadContext.Provider>
          {
            (!actionButtonPos) ? 
                  <FormButtons 
                    onSubmit={this.onSubmit} 
                    disabled={disabled} 
                    submitValue={submitValue} 
                    onCancel={onCancel}
                    cancelVariant={cancelVariant}
                    submitVariant={submitVariant}
                    classes={classes} 
                  />
                  : null
            
          }
        </Paper>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(formStyles)(Form);
