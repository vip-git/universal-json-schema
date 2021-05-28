/* eslint-disable @typescript-eslint/no-floating-promises */
// Library
import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'; // Has to be made optional
import MomentUtils from '@date-io/moment';
import isEqual from 'lodash/isEqual';
import set from 'lodash/set';
import get from 'lodash/get';
import has from 'lodash/has';
import each from 'lodash/each';
import { nanoid as generate } from 'nanoid';
import Ajv from 'ajv';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

// Types
import { FormProps } from '@core-types/Form.type';

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
import { LoadingContext, EventContext, StepperContext } from './helpers/context';

let data = {};
let uiData = {};
let validSchema = {};

/** Move this to side effects */
const setUIData = (givenUIData: {}, uiSchemaKeys: string | any[], uiSchema: {}, schema: {}, path?: string) => {
  if (uiSchemaKeys.length) {
    each(uiSchemaKeys, (val) => {
      const getPath = path ? `${path}.${val}` : val;
      const givenSchema: any = get(schema, getPath);
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

const checkSchemaErrors = (givenSchema: any, givenData: {}, onError: (arg0: Ajv.ErrorObject[]) => void) => {
  try {
    const transformedSchema = transformSchema(givenSchema);
    validSchema = transformedSchema;
    const ajv = new Ajv();
    const validate = ajv.compile(validSchema);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
  givenData: Pick<any, never>, 
  givenUIData: {}, 
  uiSchema?: {}, 
  schema?: {},
  onChange?: (arg0: 
      { formData: {}; uiData: {}; uiSchema: any; schemaErrors: boolean | Ajv.ErrorObject[]; validSchema: {}; 
    }) => void,
  onError?: undefined,
) => {
  data = removeEmptyObjects(givenData, schema);
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
  xhrSchema = { 'ui:page': { onload: { xhrProgress: false } } },
  uiSchema = {},
  validations,
  prefixId,
  submitOnEnter,
  onChange,
  onUpload,
  onSubmit,
  onStepNext,
  onStepBack,
  onStepSkip,
  onStepReset,
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
}: FormProps) => {
  const formGlobalState = {
    disabled,
  };
  const xhrProgress = xhrSchema 
                        && xhrSchema['ui:page'] 
                        && xhrSchema['ui:page'].onload 
                        && xhrSchema['ui:page'].onload.xhrProgress;
  const [loadingState, setLoadingState] = React.useState(null);
  const [prevData, setPrevData] = React.useState(null);
  const [prevSkippedData, setPrevSkippedData] = React.useState(null);
  const iniUiData = setUIData({}, Object.keys(schema.properties || {}), uiSchema, schema);
  const classes = formStyles();
  const validation = getValidationResult(schema, uiSchema, formData, validations);
  const id = prefixId || generate();
  const autoId = generate();
  const [formId, setFormId] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const hasPageLayoutTabs = uiSchema['ui:page'] 
                              && uiSchema['ui:page']['ui:layout'] 
                              && uiSchema['ui:page']['ui:layout'] === 'tabs';
  const hasPageLayoutSteps = uiSchema['ui:page'] 
                              && uiSchema['ui:page']['ui:layout'] 
                              && uiSchema['ui:page']['ui:layout'] === 'steps';

  if (
    !isEqual(prevData, { formData, schema, uiSchema }) 
    && !isEqual(prevSkippedData, { formData: removeEmptyObjects(formData, schema), schema, uiSchema }) 
  ) {
    if (prevData === null) {
      setData(
        formData, 
        iniUiData,
      );
    }
    else {
      const currentUIData = Object.keys(uiData).length ? uiData : iniUiData;
      setData(
        formData, 
        currentUIData,
        uiSchema, 
        schema,
        onChange,
        onError,
      );
    }
    setPrevData({ formData, schema, uiSchema });
    setPrevSkippedData({ formData: removeEmptyObjects(formData, schema), schema, uiSchema });
  }

  if (
    !isEqual(hashCode(JSON.stringify(schema)), formId) 
    && get(xhrSchema, 'ui:page.onload.xhrProgress') === undefined
  ) {
    if (xhrSchema 
      && has(xhrSchema, 'ui:page.onload.xhr:datasource.url')
      && has(xhrSchema, 'ui:page.onload.xhr:datasource.method')
      && has(xhrSchema, 'ui:page.onload.xhr:datasource.map:results')
    ) {
      const mappedResults = xhrSchema['ui:page'].onload['xhr:datasource']['map:results'];
      const resultsMappingInfo = mappedResults.includes('#/') 
        ? getDefinitionsValue(xhrSchema, mappedResults)
        : mappedResults;
      set(xhrSchema, 'ui:page.onload.xhrProgress', true);
      executeXHRCall({
        type: 'onload',
        url: xhrSchema['ui:page'].onload['xhr:datasource'].url,
        method: xhrSchema['ui:page'].onload['xhr:datasource'].method,
        onFailure: () => set(xhrSchema, 'ui:page.onload.xhrProgress', undefined),
        onSuccess: (xhrData: any[]) => {
          set(xhrSchema, 'ui:page.onload.xhrProgress', undefined);
          mapData(
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
          );
        },
      });
    }
    setFormId(hashCode(JSON.stringify(schema)));  
  }

  const onFormValuesChange = (field: any) => (givenValue: any, givenUIValue: any, forceDeleteUIData = false) => {
    /**
     * Todo: if adds includes data then add that data to form data based on its path and disable add data
     *       - On uncheck remove the adds data
     *       - It should be computed at the end and not on click
     */
    // console.log('isEmptyValues(givenUIValue) is', isEmptyValues(givenUIValue), givenUIValue, 'field is', field);
    const newFormData = updateFormData(data, field, givenValue);
    const newUIData = isEmptyValues(givenUIValue) || forceDeleteUIData
      ? removeValueFromSpec(uiData, field) 
      : updateFormData(uiData, field, givenUIValue);
    const finalUIData = !isEqual(givenValue, givenUIValue) 
                        || isEmptyValues(givenUIValue) 
                        || forceDeleteUIData ? newUIData : uiData;          
    setData(
      newFormData, 
      finalUIData, 
      uiSchema, 
      schema,
      onChange,
      onError,
    );
  };

  const onXHRSchemaEvent = (
    givenField: string) => (xhrDef: { [x: string]: any; url?: any; method?: any; payload?: any; }, xhrEvent: any,
  ) => {
    const { url, method, payload } = xhrDef;
    const mapDef = Object.keys(xhrDef).find((t) => t.includes('map:'));
    const findMapDef = xhrDef[mapDef];
    const field = givenField.split('.').map((gs: any, gsi: number) => (gsi > 0 ? `properties.${gs}` : gs)).join('.');
    set(xhrSchema, `properties.${givenField}.${xhrEvent}.xhrProgress`, true);
    setLoadingState({ ...loadingState, [givenField]: true });
    executeXHRCall({
      url,
      method,
      payload,
      onSuccess: (xhrData: any[]) => {
        const enums = xhrData.map((xh: any) => get(xh, findMapDef));
        set(
          schema, 
          `properties.${field}.${mapDef.replace('map:', '')}`,
          enums,
        );
        set(xhrSchema, `properties.${givenField}.${xhrEvent}.xhrComplete`, true);
        set(xhrSchema, `properties.${givenField}.${xhrEvent}.xhrProgress`, false);
        setLoadingState({ ...loadingState, [givenField]: false });
      },
    });
  };

  const onMoveItemUp = (path: any, idx: any) => () => setData(
    moveListItem(data, path, idx, -1), 
    uiData, 
    uiSchema, 
    schema,
    onChange,
    onError,
  );

  const onMoveItemDown = (path: any, idx: any) => () => setData(
    moveListItem(data, path, idx, 1), 
    uiData, 
    uiSchema, 
    schema,
    onChange,
    onError,
  );

  const onDeleteItem = (path: any, idx: any) => () => setData(
    removeListItem(data, path, idx), 
    uiData, 
    uiSchema, 
    schema,
    onChange,
    onError,
  );

  const onAddItem = (path: any, defaultValue: any) => () => setData(
    addListItem(data, path, defaultValue || ''), 
    uiData, 
    uiSchema, 
    schema,
    onChange,
    onError,
  );

  const onAddNewProperty = (path: any, defaultValue: any) => () => setData(
    updateFormData(data, generate(), defaultValue || ''),
    uiData,
    uiSchema, 
    schema,
    onChange,
    onError,
  );

  const onRemoveProperty = (path: any) => () => setData(
    removeValueFromSpec(data, path), 
    uiData, 
    uiSchema, 
    schema,
    onChange,
    onError,
  );

  const onUpdateKeyProperty = (path: any) => (givenValue: any, givenUIValue: any, forceDeleteUIData = false) => {
    if (!isEmptyValues(givenUIValue) && !isEmptyValues(givenValue)) {
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
    }
  };

  const onFormSubmit = (callback?: () => any) => {
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
        onSuccess: (xhrData: any[]) => {
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
      { formData: data, uiData, uiSchema, validation }, 
      () => callback && callback(),
    );
  };

  const onFormNext = (path: string | number, callback: () => any) => {
    if (
      xhrSchema 
      && has(xhrSchema, `properties.${path}.onsubmit.xhr:datasource.url`)
      && has(xhrSchema, `properties.${path}.onsubmit.xhr:datasource.method`)
      && has(xhrSchema, `properties.${path}.onsubmit.xhr:datasource.map:results`)
      && has(xhrSchema, `properties.${path}.onsubmit.xhr:datasource.map:payload`)
    ) {
      const { url, method } = xhrSchema.properties[path].onsubmit['xhr:datasource'];
      const payloadData = xhrSchema.properties[path].onsubmit['xhr:datasource']['map:payload'];
      const schemaProps = schema.properties;
      const schemaDefs = schema.definitions;
      const getPayloadFromTemplateString = (givenData: {}, pKey: string) => {
        const payloadKey = pKey.replace('${formData.', '').replace('}', '');
        return pKey.replace('${', '').replace('}', '') === 'formData' ? givenData : get(givenData, payloadKey);
      };
      const payload = payloadData.includes('${formData') 
        ? getPayloadFromTemplateString(data, payloadData) // Todo: add map results functionality as optional
        : setNestedPayload({ // Todo: make map resulsts functionality optional
          payloadData,
          formData: data,
          schemaProps,
          schemaDefs,
        });
      return executeXHRCall({
        type: 'onNext',
        url,
        method,
        payload,
        onSuccess: (xhrData: any[]) => {
          const xhrDt = Array.isArray(xhrData) ? xhrData[0] : xhrData;
          const mappedResults = xhrSchema.properties[path].onsubmit['xhr:datasource']['map:results'];
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
    return onStepNext && onStepNext(
      { formData: data, uiData, uiSchema, validation },
      () => callback && callback(),
    );
  };

  const onFormBack = (path: any, callback: () => any) => onStepBack && onStepBack(
    { formData: data, uiData, uiSchema, validation },
    () => callback && callback(),
  );

  const onFormSkip = (path: any, callback: () => any) => onStepSkip && onStepSkip(
    { formData: data, uiData, uiSchema, validation },
    () => callback && callback(),
  );

  const onFormReset = (path: any, callback: () => any) => onStepReset && onStepReset(
    { formData: data, uiData, uiSchema, validation },
    () => callback && callback(),
  );

  const handleKeyEnter = (e: { keyCode: number; }) => {
    if (e.keyCode === 13 && submitOnEnter) {
      onFormSubmit();
    }
  };

  if (get(uiSchema, 'ui:page.props.ui:schemaErrors') 
  || !has(uiSchema, 'ui:page.props.ui:schemaErrors')) {
    try {
      const givenSchema = get(uiSchema, 'ui:page.ui:layout') === 'steps' 
        ? JSON.parse(JSON.stringify(schema))
        : schema;
      if (get(uiSchema, 'ui:page.ui:layout') === 'steps') {
        Object.keys(givenSchema.properties).forEach((propName) => {
          givenSchema.properties[propName] = propName === Object.keys(givenSchema.properties)[activeStep] ? {
            ...givenSchema.properties[propName],
          } : {
            ...givenSchema.properties[propName],
            required: [],
          };
        });
      }
      const transformedSchema = transformSchema(givenSchema);
      const ajv = new Ajv();
      const validate = ajv.compile(transformedSchema);
      validate(data);
      const externalValidations = isFormInValid(validation);
      const isDisabled = disabled || externalValidations || validate.errors;
      formGlobalState.disabled = !!isDisabled;
      if (formGlobalState.disabled !== buttonDisabled) {
        setButtonDisabled(formGlobalState.disabled);
      }
    }
    catch (err) {
      // console.log('err', err);
    }
  }
  return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Paper className={classes.root} style={uiSchema && uiSchema['ui:page'] ? uiSchema['ui:page'].style : {}}>
          {
            (actionButtonPos === 'top' && !hasPageLayoutSteps) 
              ? (
                  <FormButtons 
                    onSubmit={(callback: any) => onFormSubmit(callback)}
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
          <LoadingContext.Provider value={loadingState}>
            <StepperContext.Provider value={[activeStep, setActiveStep, buttonDisabled] as any}>
              <EventContext.Provider value={onUpload}>
                {
                  xhrProgress && !hasPageLayoutTabs ? (
                      <div> 
                        <CircularProgress disableShrink />
                      </div>
                  ) : (
                      <FormField
                            path={''}
                            data={data}
                            uiData={uiData}
                            schemaVersion={schema.version}
                            schema={schema}
                            uiSchema={uiSchema}
                            xhrSchema={xhrSchema}
                            definitions={schema.definitions}
                            interceptors={interceptors}
                            id={id}
                            onChange={onFormValuesChange}
                            onXHRSchemaEvent={onXHRSchemaEvent}
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
                            onNext={onFormNext}
                            onBack={onFormBack}
                            onSkip={onFormSkip}
                            isSubmitDisabled={formGlobalState.disabled}
                            {...rest}
                      />
                  )
                }
              </EventContext.Provider>
            </StepperContext.Provider>
          </LoadingContext.Provider>
          {
            (!actionButtonPos && !hasPageLayoutSteps) 
              ? (
                  <FormButtons
                    onSubmit={(callback: any) => onFormSubmit(callback)}
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
