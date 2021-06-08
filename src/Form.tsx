// Library
import React from 'react';
import { nanoid as generate } from 'nanoid';

// Material UI
import { MuiPickersUtilsProvider } from '@material-ui/pickers'; // Has to be made optional
import MomentUtils from '@date-io/moment';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

// Types
import { FormProps } from '@core-types/Form.type';

// Internal
import formStyles from './form-styles';
import FormField from './FormField';
import FormButtons from './FormButtons';

// State Machine Helpers
import { 
  useFormStateMachine,
  useFormEvents,
  useStepperEvents,
} from './helpers/state-machine/form/hooks';

// import removeEmptyObjects, { isEmptyValues } from './helpers/remove-empty-values';
// import transformSchema, { 
// hashCode, mapData, setNestedPayload, getDefinitionsValue } from './helpers/transform-schema';
// import getValidationResult from './helpers/validation';
// import executeXHRCall from './helpers/execute-xhr-call';

// Initial Contexts
import { LoadingContext, EventContext, StepperContext } from './helpers/context';

const Form = ({
  formData: originalFormData,
  schema = {},
  xhrSchema = { 'ui:page': { onload: { xhrProgress: false } } },
  uiSchema: originalUISchema = {},
  validations,
  prefixId,
  submitOnEnter,
  onChange,
  onUpload,
  onSubmit,
  onStepNext: givenOnStepNext,
  onStepBack: givenOnStepBack,
  onStepSkip: givenOnStepSkip,
  onStepReset: givenOnStepReset,
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
  const {
    formInfo: {
      // schema,
      uiData,
      uiSchema,
      formData,
      activeStep,
    },
    validation,
    loadingState,
    buttonDisabled,
    stateMachineService,
    setLoadingState,
  } = useFormStateMachine({
    xhrSchema,
    validations,
    originalFormInfo: {
      schema,
      uiSchema: originalUISchema,
      formData: originalFormData,
    },
    effects: {
      onChange,
      onError,
    },
  });

  // Form Events
  const {
    onMoveItemUp,
    onMoveItemDown,
    onDeleteItem,
    onAddItem,
    onAddNewProperty,
    onRemoveProperty,
    onUpdateKeyProperty,
    onFormValuesChange,
    onFormSubmit,
    onXHRSchemaEvent,
    handleKeyEnter,
  } = useFormEvents({
    validation,
    stateMachineService,
    formData,
    setLoadingState,
    loadingState,
    schema,
    uiData, 
    uiSchema, 
    xhrSchema,
    interceptors,
    submitOnEnter,
    onSubmit,
    onChange,
    onError,
  });

  // Stepper Events
  const {
    onStepNext,
    onStepBack,
    onStepSkip,
    // onStepReset,
  } = useStepperEvents({
    stateMachineService,
    validation,
    formData,
    schema,
    uiData, 
    uiSchema,
    xhrSchema,
    interceptors,
    onSubmit,
    onChange,
    onError,
    givenOnStepNext,
    givenOnStepReset,
    givenOnStepBack,
    givenOnStepSkip,
  });

  const xhrProgress = xhrSchema 
                        && xhrSchema['ui:page'] 
                        && xhrSchema['ui:page'].onload 
                        && xhrSchema['ui:page'].onload.xhrProgress;

  // const iniUiData = setUIData({}, Object.keys(schema.properties || {}), uiSchema, schema);

  const classes = formStyles();
  const id = prefixId || generate();

  // const autoId = generate();
  // const [formId, setFormId] = React.useState(null);

  const hasPageLayoutTabs = uiSchema['ui:page'] 
                              && uiSchema['ui:page']['ui:layout'] 
                              && uiSchema['ui:page']['ui:layout'] === 'tabs';

  const hasPageLayoutSteps = uiSchema['ui:page'] 
                              && uiSchema['ui:page']['ui:layout'] 
                              && uiSchema['ui:page']['ui:layout'] === 'steps';        
             
  // if (
  //   !isEqual(hashCode(JSON.stringify(schema)), formId) 
  //   && get(xhrSchema, 'ui:page.onload.xhrProgress') === undefined
  // ) {
  //   if (xhrSchema 
  //     && has(xhrSchema, 'ui:page.onload.xhr:datasource.url')
  //     && has(xhrSchema, 'ui:page.onload.xhr:datasource.method')
  //     && has(xhrSchema, 'ui:page.onload.xhr:datasource.map:results')
  //   ) {
  //     const mappedResults = xhrSchema['ui:page'].onload['xhr:datasource']['map:results'];
  //     const resultsMappingInfo = mappedResults.includes('#/') 
  //       ? getDefinitionsValue(xhrSchema, mappedResults)
  //       : mappedResults;
  //     set(xhrSchema, 'ui:page.onload.xhrProgress', true);
  //     executeXHRCall({
  //       type: 'onload',
  //       url: xhrSchema['ui:page'].onload['xhr:datasource'].url,
  //       method: xhrSchema['ui:page'].onload['xhr:datasource'].method,
  //       onFailure: () => set(xhrSchema, 'ui:page.onload.xhrProgress', undefined),
  //       onSuccess: (xhrData: any[]) => {
  //         set(xhrSchema, 'ui:page.onload.xhrProgress', undefined);
  //         mapData(
  //           resultsMappingInfo,
  //           Array.isArray(xhrData) ? xhrData[0] : xhrData,
  //           data,
  //           uiData,
  //           uiSchema,
  //           interceptors,
  //           schema,
  //           onChange,
  //           onError,
  //           setData,
  //         );
  //       },
  //     });
  //   }
  //   setFormId(hashCode(JSON.stringify(schema)));  
  // }

  const RenderFormButtons = () => (
      <FormButtons
        onSubmit={(callback: any) => onFormSubmit(callback)}
        disabled={buttonDisabled}
        submitValue={submitValue}
        cancelValue={cancelValue} 
        onCancel={onCancel}
        cancelVariant={cancelVariant}
        submitVariant={submitVariant}
        classes={classes} 
        activityIndicatorEnabled={activityIndicatorEnabled}
      />
  );

  return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Paper className={classes.root} style={uiSchema && uiSchema['ui:page'] ? uiSchema['ui:page'].style : {}}>
          {
            (actionButtonPos === 'top' && !hasPageLayoutSteps) && (
              <RenderFormButtons />
            )
          }
          <LoadingContext.Provider value={loadingState}>
            <StepperContext.Provider value={[activeStep, buttonDisabled] as any}>
              <EventContext.Provider value={onUpload}>
                {
                  xhrProgress && !hasPageLayoutTabs ? (
                      <div> 
                        <CircularProgress disableShrink />
                      </div>
                  ) : (
                      <FormField
                        path={''}
                        data={formData}
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
                        onNext={onStepNext}
                        onBack={onStepBack}
                        onSkip={onStepSkip}
                        isSubmitDisabled={buttonDisabled}
                        {...rest}
                      />
                  )
                }
              </EventContext.Provider>
            </StepperContext.Provider>
          </LoadingContext.Provider>
          {
            (!actionButtonPos && !hasPageLayoutSteps) && (
              <RenderFormButtons />
            )
          }
        </Paper>
      </MuiPickersUtilsProvider>
  );
};

export default Form;
