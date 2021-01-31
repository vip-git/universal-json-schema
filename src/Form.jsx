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
import FormButtons from './FormButtons';

// Helpers
import updateFormData, { 
  addListItem, 
  removeListItem, 
  moveListItem,
  removeValueFromSpec,
  updateKeyFromSpec,
  setUISchemaData,
} from './helpers/update-form-data';
import removeEmptyObjects, { isEmptyValues } from './helpers/remove-empty-values';
import isFormInValid from './helpers/validation/is-form-validated';
import transformSchema, { hashCode, mapData, setNestedPayload, getDefinitionsValue } from './helpers/transform-schema';
import getValidationResult from './helpers/validation';
import executeXHRCall from './helpers/execute-xhr-call';

// Initial Contexts
export const EventContext = React.createContext('fieldEvent');
let data = {};
let uiData = {};
let validSchema = {};

/** Move this to side effects */
const setUIData = (givenUIData, uiSchemaKeys, uiSchema, schema, path) => {
  if (uiSchemaKeys.length) {
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
  }
  return givenUIData;
};

const checkSchemaErrors = (givenSchema, givenData, onError) => {
  try {
    const transformedSchema = transformSchema(givenSchema);
    validSchema = transformedSchema;
    const validate = validator(transformedSchema, { verbose: true });
    validate(givenData);
    if (validate.errors && onError && typeof onError === 'function') {
      onError(validate.errors);
    }
    return validate.errors;
  }
  catch (err) {
    // console.log('err', err);
  }
  return false;
};

const setData = (
  givenData, 
  givenUIData, 
  uiSchema, 
  schema,
  onChange,
  onError,
) => {
  data = typeof givenData === 'string' ? givenData : removeEmptyObjects(givenData);
  if (uiSchema) {
    uiData = givenUIData;
    setUISchemaData(uiData, uiSchema);
  }
  if (typeof onChange === 'function') {
    const schemaErrors = checkSchemaErrors(schema, data, onError);
    onChange({ formData: data, uiData, uiSchema, schemaErrors, validSchema });
  }
};

const Form = ({
  formData,
  schema = {},
  xhrSchema = {},
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
  interceptors,
  ...rest 
}) => {
  const formGlobalState = {
    disabled,
  };
  const [prevData, setPrevData] = React.useState(null);
  const [prevSkippedData, setPrevSkippedData] = React.useState(null);
  const iniUiData = setUIData({}, Object.keys(schema.properties || {}), uiSchema, schema);
  const classes = formStyles();
  const validation = getValidationResult(schema, uiSchema, formData, validations);
  const id = prefixId || generate();
  const [formId, setFormId] = React.useState(null);

  if (
    !isEqual(prevData, { formData, schema, uiSchema }) 
    && !isEqual(prevSkippedData, { formData: removeEmptyObjects(formData), schema, uiSchema }) 
  ) {
    if (prevData === null) {
      setData(
        formData, 
        iniUiData,
      );
    }
    else {
      setData(
        formData, 
        iniUiData,
        uiSchema, 
        schema,
        onChange,
        onError,
      );
    }
    setPrevData({ formData, schema, uiSchema });
    setPrevSkippedData({ formData: removeEmptyObjects(formData), schema, uiSchema });
  }

  if (!isEqual(hashCode(JSON.stringify(schema)), formId)) {
    if (xhrSchema 
      && has(xhrSchema, 'ui:page.onload.xhr:datasource.url')
      && has(xhrSchema, 'ui:page.onload.xhr:datasource.method')
      && has(xhrSchema, 'ui:page.onload.xhr:datasource.map:results')
    ) {
      const mappedResults = xhrSchema['ui:page'].onload['xhr:datasource']['map:results'];
      const resultsMappingInfo = mappedResults.includes('#/') 
        ? getDefinitionsValue(xhrSchema, mappedResults)
        : mappedResults;
      executeXHRCall({
        type: 'onload',
        url: xhrSchema['ui:page'].onload['xhr:datasource'].url,
        method: xhrSchema['ui:page'].onload['xhr:datasource'].method,
        mapData: (xhrData) => mapData(
          resultsMappingInfo,
          Array.isArray(xhrData) ? xhrData[0] : xhrData,
          data,
          uiData,
          uiSchema,
          interceptors,
          schema,
          onChange,
          onError,
          setData,
        ),
      });
    }  
    setFormId(hashCode(JSON.stringify(schema)));  
  }

  const onFormValuesChange = (field) => (givenValue, givenUIValue, forceDeleteUIData = false) => {
    const newFormData = updateFormData(data, field, givenValue);
    const newUIData = isEmptyValues(givenUIValue) || forceDeleteUIData
      ? removeValueFromSpec(uiData, field) 
      : updateFormData(uiData, field, givenUIValue);
    setData(
      newFormData, 
      !isEqual(givenValue, givenUIValue) || isEmptyValues(givenUIValue) || forceDeleteUIData ? newUIData : uiData, 
      uiSchema, 
      schema,
      onChange,
      onError,
    );
  };

  const onMoveItemUp = (path, idx) => () => setData(
    moveListItem(data, path, idx, -1), 
    uiData, 
    uiSchema, 
    schema,
    onChange,
    onError,
  );

  const onMoveItemDown = (path, idx) => () => setData(
    moveListItem(data, path, idx, 1), 
    uiData, 
    uiSchema, 
    schema,
    onChange,
    onError,
  );

  const onDeleteItem = (path, idx) => () => setData(
    removeListItem(data, path, idx), 
    uiData, 
    uiSchema, 
    schema,
    onChange,
    onError,
  );

  const onAddItem = (path, defaultValue) => () => setData(
    addListItem(data, path, defaultValue || ''), 
    uiData, 
    uiSchema, 
    schema,
    onChange,
    onError,
  );

  const onAddNewProperty = (path, defaultValue) => () => setData(
    updateFormData(data, generate(), defaultValue || ''),
    uiData,
    uiSchema, 
    schema,
    onChange,
    onError,
  );

  const onRemoveProperty = (path) => () => setData(
    removeValueFromSpec(data, path), 
    uiData, 
    uiSchema, 
    schema,
    onChange,
    onError,
  );

  const onUpdateKeyProperty = (path) => (givenValue, givenUIValue, forceDeleteUIData = false) => {
    const givenFormData = updateKeyFromSpec(data, path, givenValue);
    const givenUIData = givenUIValue && updateKeyFromSpec(uiData, path, givenUIValue);
    setData(
      givenFormData,
      !isEqual(givenValue, givenUIValue) || isEmptyValues(givenUIValue) || forceDeleteUIData ? givenUIData : uiData, 
      uiSchema, 
      schema,
      onChange,
      onError,
    );
  };

  const onFormSubmit = (callback) => {
    if (
      xhrSchema 
      && has(xhrSchema, 'ui:page.onsubmit.xhr:datasource.url')
      && has(xhrSchema, 'ui:page.onsubmit.xhr:datasource.method')
      && has(xhrSchema, 'ui:page.onsubmit.xhr:datasource.map:results')
      && has(xhrSchema, 'ui:page.onsubmit.xhr:datasource.map:payload')
    ) {
      const { url, method } = xhrSchema['ui:page'].onsubmit['xhr:datasource'];
      const payload = setNestedPayload({
        payloadData: xhrSchema['ui:page'].onsubmit['xhr:datasource']['map:payload'],
        formData: data,
        schemaProps: schema.properties,
      });
      return executeXHRCall({
        type: 'onsubmit',
        url,
        method,
        payload,
        mapData: (xhrData) => {
          const xhrDt = Array.isArray(xhrData) ? xhrData[0] : xhrData;
          const mappedResults = xhrSchema['ui:page'].onsubmit['xhr:datasource']['map:results'];
          const resultsMappingInfo = mappedResults.includes('#/') 
            ? getDefinitionsValue(xhrSchema, mappedResults)
            : mappedResults;
          mapData(
            resultsMappingInfo,
            xhrDt,
            data,
            uiData,
            uiSchema,
            interceptors,
            schema,
            onChange,
            onError,
            setData,
          );
          return onSubmit(
            { formData: xhrDt, uiData, uiSchema, validation }, 
            () => callback && callback(),
          );
        },
      });
    }
    return onSubmit(
      { formData, uiData, uiSchema, validation }, 
      () => callback && callback(),
    );
  };

  const handleKeyEnter = (e) => {
    if (e.keyCode === 13 && submitOnEnter) {
      onFormSubmit();
      // put the login here
    }
  };

  if (get(uiSchema, 'ui:page.ui:props.ui:schemaErrors') 
  || !has(uiSchema, 'ui:page.ui:props.ui:schemaErrors')) {
    try {
      const transformedSchema = transformSchema(schema);
      const validate = validator(transformedSchema, { verbose: true });
      validate(data);
      const externalValidations = isFormInValid(validation);
      const isDisabled = disabled || externalValidations || validate.errors;
      formGlobalState.disabled = !!isDisabled;
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
                    onSubmit={(callback) => onFormSubmit(callback)}
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
                interceptors={interceptors}
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
                    onSubmit={(callback) => onFormSubmit(callback)}
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
