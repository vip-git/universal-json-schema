import React from 'react';
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
  notifyChange = () => {
    const { onChange } = this.props;
    const { data } = this.state;
    if (onChange) {
      onChange({ formData: data });
    }
  }
  render() {
    const { classes, formData, onSubmit, onChange, onCancel, ...rest } = this.props;
    const { validation, id } = this.state;
    return (
      <Paper className={classes.root}>
        <ValidationMessages validation={validation} />
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
        <FormButtons onSubmit={this.onSubmit} onCancel={onCancel} classes={classes} />
      </Paper>
    );
  }
}

export default withStyles(formStyles)(Form);
