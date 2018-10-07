import React from 'react';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import isEqual from 'lodash/isEqual';
import { generate } from 'shortid';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import formStyles from './form-styles';
import FormField from './FormField';
import updateFormData, { addListItem, removeListItem, moveListItem } from './helpers/update-form-data';
import getValidationResult from './helpers/validation';
import ValidationMessages from './ValidationMessages';
import FormButtons from './FormButtons';

const createOption = label => ({
  label,
  value: label,
});

class Form extends React.Component {
  state = {
    data: this.props.formData,
    validation: getValidationResult(this.props.schema, this.props.formData),
    id: generate(),
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
  handleCreatableSelectChange = (value, actionMeta) => {
    console.group('Value Changed');
    console.log(value);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value }, this.notifyChange);
  };
  handleCreatableSelectInputChange = (inputValue) => {
    this.setState({ inputValue }, this.notifyChange);
  };
  handleCreatableSelectKeyDown = (event) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    const finalVal = (value) ? [...JSON.parse(value), createOption(inputValue)] : [createOption(inputValue)];
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group('Value Added');
        console.log(finalVal);
        console.groupEnd();
        this.setState({
          inputValue: '',
          value: JSON.stringify(finalVal),
        });
        event.preventDefault();
        break;
      default:
        break;
    }
  };
  notifyChange = () => {
    const { onChange } = this.props;
    const { data, inputValue, value } = this.state;
    if (onChange) {
      onChange({ formData: data, inputValue, value });
    }
  }
  render() {
    const { classes, formData, onSubmit, actionButtonPos, onChange, onCancel, submitValue, ...rest } = this.props;
    const { validation, id } = this.state;
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Paper className={classes.root}>
          {
            (actionButtonPos === 'top') ? 
                  <FormButtons onSubmit={this.onSubmit} submitValue={submitValue} onCancel={onCancel} classes={classes} />
                  : null
            
          }
          <ValidationMessages validation={validation} />
          <FormField
            path={''}
            data={this.state.data}
            id={id}
            inputValue={this.state.inputValue}
            creatableSelectValue={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.handleCreatableSelectKeyDown}
            onCreatableSelectChange={this.handleCreatableSelectChange}
            onInputChange={this.handleCreatableSelectInputChange}
            onSubmit={this.onSubmit}
            validation={validation}
            onMoveItemUp={this.onMoveItemUp}
            onMoveItemDown={this.onMoveItemDown}
            onDeleteItem={this.onDeleteItem}
            onAddItem={this.onAddItem}
            {...rest}
          />
          {
            (!actionButtonPos) ? 
                  <FormButtons onSubmit={this.onSubmit} submitValue={submitValue} onCancel={onCancel} classes={classes} />
                  : null
            
          }
        </Paper>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(formStyles)(Form);
