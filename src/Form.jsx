// Library
import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import get from 'lodash/get';
import has from 'lodash/has';
import each from 'lodash/each';
import { generate } from 'shortid';
import validator from 'is-my-json-valid';
import Paper from '@material-ui/core/Paper';

// Internal
import formStyles from './form-styles';
import FormField from './FormField';
import updateFormData, { 
  addListItem, 
  removeListItem, 
  moveListItem,
  removeValueFromSpec,
  updateKeyFromSpec,
  setUISchemaData,
} from './helpers/update-form-data';
import transformSchema from './helpers/transform-schema';
import getValidationResult from './helpers/validation';
import FormButtons from './FormButtons';

// Initial Contexts
export const EventContext = React.createContext('fieldEvent');
let data = {};
let uiData = {};

const setUIData = (givenUIData, uiSchemaKeys, uiSchema, schema, path) => {
  each(uiSchemaKeys, (val) => {
    const getPath = path ? `${path}.${val}` : val;
    const givenSchema = get(schema, getPath);
    const fieldUIData = get(uiSchema, `${getPath}.ui:data`);
    if (fieldUIData) {
      set(givenUIData, getPath, fieldUIData);
    }
    else if (givenSchema && givenSchema.type === 'object' && givenSchema.properties) {
      setUIData(givenUIData, Object.keys(givenSchema.properties), uiSchema, schema, val);
    }
  });
  return givenUIData;
};

const setData = (givenData, givenUIData, uiSchema, onChange) => {
  data = givenData;
  uiData = givenUIData;
  setUISchemaData(uiData, uiSchema);
  if (typeof onChange === 'function') {
    onChange({ formData: givenData, uiData, uiSchema });
  }
};

const Form = ({
  formData,
  schema,
  uiSchema,
  validations,
  prefixId,
  submitOnEnter,
  onChange,
  onUpload,
  onSubmit, 
  formButtons,
  actionButtonPos,
  onCancel, 
  activityIndicatorEnabled,
  submitValue,
  cancelValue,
  inProgressValue,
  disabled, 
  cancelVariant,
  submitVariant,
  onError,
  ...rest 
}) => {
  const formGlobalState = {
    disabled,
  };
  const iniUiData = setUIData({}, Object.keys(schema.properties), uiSchema, schema);
  const classes = formStyles();
  const validation = getValidationResult(schema, uiSchema, formData, validations);
  const id = prefixId || generate();

  setData(formData, iniUiData);

  const onFormValuesChange = (field) => (givenValue, givenUIValue) => {
    const newFormData = updateFormData(data, field, givenValue);
    const newUIData = givenUIValue && updateFormData(uiData, field, givenUIValue);
    setData(newFormData, newUIData || uiData, uiSchema, onChange);
  };

  const onMoveItemUp = (path, idx) => () => setData(moveListItem(data, path, idx, -1), uiData, uiSchema, onChange);

  const onMoveItemDown = (path, idx) => () => setData(moveListItem(data, path, idx, 1), uiData, uiSchema, onChange);

  const onDeleteItem = (path, idx) => () => setData(removeListItem(data, path, idx), uiData, uiSchema, onChange);

  const onAddItem = (path, defaultValue) => () => setData(
    addListItem(data, path, defaultValue || ''), uiData, uiSchema, onChange,
  );

  const onAddNewProperty = (path, defaultValue) => () => setData(
    updateFormData(data, generate(), defaultValue || ''),
    uiData,
    uiSchema,
    onChange);

  const onRemoveProperty = (path) => () => setData(removeValueFromSpec(data, path), uiData, uiSchema, onChange);

  const onUpdateKeyProperty = (path) => (givenValue, givenUIValue) => {
    if (!isEqual(path, givenValue) && !isEmpty(givenValue)) {
      const givenFormData = updateKeyFromSpec(data, path, givenValue);
      const givenUIData = givenUIValue && updateKeyFromSpec(uiData, path, givenUIValue);
      setData(givenFormData, givenUIData || uiData, uiSchema, onChange);
    }
  };

  const onFormSubmit = (callback) => onSubmit({ formData: data, uiData, uiSchema }, () => callback && callback());

  const handleKeyEnter = (e) => {
    if (e.keyCode === 13 && submitOnEnter) {
      onSubmit();
      // put the login here
    }
  };

  if (get(uiSchema, 'ui:page.ui:props.ui:schemaErrors') 
  || !has(uiSchema, 'ui:page.ui:props.ui:schemaErrors')) {
    try {
      const transformedSchema = transformSchema(schema);
      const validate = validator(transformedSchema, { verbose: true });
      validate(data);
      formGlobalState.disabled = disabled || validate.errors;
      if (validate.errors && onError && typeof onError === 'function') {
        onError(validate.errors);
      }
    }
    catch (err) {
      // console.log('err', err);
    }
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Paper className={classes.root}>
        {
          (actionButtonPos === 'top') 
            ? (
                <FormButtons 
                  onSubmit={(callback) => onSubmit(callback)}
                  submitValue={submitValue} 
                  inProgressValue={inProgressValue}
                  disabled={formGlobalState.disabled} 
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
        <EventContext.Provider value={onUpload}>
          <FormField
              path={''}
              data={data}
              uiData={uiData}
              schemaVersion={schema.version}
              schema={schema}
              uiSchema={uiSchema}
              definitions={schema.definitions}
              id={id}
              onChange={onFormValuesChange}
              onSubmit={onFormSubmit}
              validation={validation}
              onKeyDown={handleKeyEnter}
              onMoveItemUp={onMoveItemUp}
              onMoveItemDown={onMoveItemDown}
              onDeleteItem={onDeleteItem}
              onAddItem={onAddItem}
              onAddNewProperty={onAddNewProperty}
              onRemoveProperty={onRemoveProperty}
              onUpdateKeyProperty={onUpdateKeyProperty}
              {...rest}
          />
        </EventContext.Provider>
        {
          (!actionButtonPos) 
            ? (
                <FormButtons
                  onSubmit={(callback) => onSubmit(callback)}
                  disabled={formGlobalState.disabled}
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
};

export default Form;
