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
  getHashCodeFromXHRDef,
} from './helpers/state-machine/form/hooks';

// Initial Contexts
import { LoadingContext, EventContext, StepperContext } from './helpers/context';

const Form = ({
  formData: originalFormData,
  schema = {},
  xhrSchema = {},
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
      formSchemaXHR,
      uiData,
      uiSchema,
      formData,
      activeStep,
      xhrProgress,
    },
    validation,
    loadingState,
    buttonDisabled,
    stateMachineService,
    setLoadingState,
  } = useFormStateMachine({
    xhrSchema,
    validations,
    interceptors,
    originalFormInfo: {
      schema,
      uiSchema: originalUISchema,
      formData: originalFormData,
      xhrSchema,
    },
    effects: {
      onChange,
      onError,
    },
  });

  // Form Events
  const {
    onTabChange,
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
    givenOnStepNext,
    givenOnStepReset,
    givenOnStepBack,
    givenOnStepSkip,
  });

  const classes = formStyles();
  const id = prefixId || generate();
  const hashRef = getHashCodeFromXHRDef({
    eventName: 'onload',
    fieldPath: 'ui:page',
    xhrSchema,
  });

  const isFormLoading = xhrProgress && hashRef && xhrProgress[hashRef];

  const hasPageLayoutTabs = uiSchema['ui:page'] 
                              && uiSchema['ui:page']['ui:layout'] 
                              && uiSchema['ui:page']['ui:layout'] === 'tabs';

  const hasPageLayoutSteps = uiSchema['ui:page'] 
                              && uiSchema['ui:page']['ui:layout'] 
                              && uiSchema['ui:page']['ui:layout'] === 'steps';

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
            !isFormLoading && (actionButtonPos === 'top' && !hasPageLayoutSteps) && (
              <RenderFormButtons />
            )
          }
          <LoadingContext.Provider value={loadingState}>
            <StepperContext.Provider value={[activeStep, buttonDisabled] as any}>
              <EventContext.Provider value={onUpload}>
                {
                  isFormLoading && !hasPageLayoutTabs ? (
                      <div> 
                        <CircularProgress disableShrink />
                      </div>
                  ) : (
                      <FormField
                        path={''}
                        data={formData}
                        uiData={uiData}
                        schemaVersion={schema.version}
                        schema={{
                          ...schema,
                          ...formSchemaXHR,
                        }}
                        uiSchema={uiSchema}
                        xhrSchema={xhrSchema}
                        definitions={schema.definitions}
                        interceptors={interceptors}
                        xhrProgress={xhrProgress}
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
                        onTabChange={onTabChange}
                        isSubmitDisabled={buttonDisabled}
                        {...rest}
                      />
                  )
                }
              </EventContext.Provider>
            </StepperContext.Provider>
          </LoadingContext.Provider>
          {
            !isFormLoading && (!actionButtonPos && !hasPageLayoutSteps) && (
              <RenderFormButtons />
            )
          }
        </Paper>
      </MuiPickersUtilsProvider>
  );
};

export default Form;
