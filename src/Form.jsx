/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
// Library
import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import isEqual from 'lodash/isEqual';
import { generate } from 'shortid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import each from 'lodash/each';

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
    validation: getValidationResult(this.props.schema, this.props.uiSchema, this.props.formData, this.props.validations),
    id: this.props.prefixId || generate(),
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    let validation;
    if (!isEqual(nextProps.schema, this.props.schema)) {
      validation = {};
    }
    else {
      validation = getValidationResult(nextProps.schema, nextProps.uiSchema, nextProps.formData, this.props.validations);
    }
    this.setState({
      validation,
      data: nextProps.formData,
    });
  }

  onChange = (field) => (value) => {
    const data = updateFormData(this.state.data, field, value);
    this.setState({
      data,
      validation: getValidationResult(this.props.schema, this.props.uiSchema, data, this.props.validations),
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

  onSubmit = (callback) => {
    this.props.onSubmit({ formData: this.state.data }, () => callback && callback());
  }

  handleKeyEnter = (e) => {
    if (e.keyCode === 13 && this.props.submitOnEnter) {
      this.onSubmit();
      // put the login here
    }
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
    try {
      const transformedSchema = JSON.parse(JSON.stringify(this.props.schema));
      const notAllowedTypes = ['upload', 'material-date'];
      each(transformedSchema, (value, key) => {
        console.log('value is', value);
        console.log('key us', key);
        if (key === 'properties') {
          each(value, (propVal, propKey) => {
            if (notAllowedTypes.includes(propVal.type)) {
              transformedSchema.properties[propKey].type = 'string';
            }
          });
        }
      });
      console.log('transformedSchema is', transformedSchema);
      // eslint-disable-next-line global-require
      const { buildYup } = require('schema-to-yup');
      const yupSchema = buildYup(transformedSchema, {});
      const isValid = async (schema, data) => {
        const valid = await schema.isValid(data);
        console.log(schema);
        console.log('formData is', data);
        console.log('valid is', valid);
        return valid;
      };
      const valid = isValid(yupSchema, this.props.formData);
    }
    catch (err) {
      // console.log('err' , err);
    }
    const { 
      classes, 
      formData, 
      onUpload,
      onSubmit, 
      formButtons, 
      actionButtonPos, 
      onChange, 
      onCancel, 
      activityIndicatorEnabled,
      submitValue,
      cancelValue,
      inProgressValue,
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
            (actionButtonPos === 'top') 
              ? (
                  <FormButtons 
                    onSubmit={(callback) => this.onSubmit(callback)}
                    submitValue={submitValue} 
                    inProgressValue={inProgressValue}
                    disabled={disabled} 
                    onCancel={onCancel}
                    cancelValue={cancelValue} 
                    cancelVariant={cancelVariant}
                    submitVariant={submitVariant}
                    classes={classes} 
                    activityIndicatorEnabled={activityIndicatorEnabled}
                  />
              )
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
                onKeyDown={this.handleKeyEnter}
                onMoveItemUp={this.onMoveItemUp}
                onMoveItemDown={this.onMoveItemDown}
                onDeleteItem={this.onDeleteItem}
                onAddItem={this.onAddItem}
                {...rest}
            />
          </UploadContext.Provider>
          {
            (!actionButtonPos) 
              ? (
                  <FormButtons
                    onSubmit={(callback) => this.onSubmit(callback)}
                    disabled={disabled}
                    submitValue={submitValue}
                    cancelValue={cancelValue} 
                    onCancel={onCancel}
                    cancelVariant={cancelVariant}
                    submitVariant={submitVariant}
                    classes={classes} 
                    activityIndicatorEnabled={activityIndicatorEnabled}
                  />
              )
              : null
            
          }
        </Paper>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(formStyles)(Form);
