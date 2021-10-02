/**
 * Todo:
 * - This file should be generated for react framework code gen
 * - All Material UI libs should come from UIFramework const
 * - All imports should be optional based on what gets selected
 */
// Material UI
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

// Types
import { FormProps } from './types/Form.type';
import Framework from '../universal-schema/framework';

// Internal
import formStyles, { defaultTheme } from './form-styles';
import FormField from './FormField';
import FormButtons from './FormButtons';

// State Machine Helpers
import { 
  useFormStateMachine,
  useFormEvents,
  useStepperEvents,
  getHashCodeFromXHRDef,
} from '../helpers/state-machine/form/hooks';

// Initial Contexts
import { LoadingContext, EventContext, StepperContext } from '../helpers/context';

const {
  React,
  nanoId: generate,
} = Framework.library;

const Form = ({
  theme,
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
      validation,
    },
    loadingState,
    buttonDisabled,
    stateMachineService,
  } = useFormStateMachine({
    xhrSchema,
    interceptors,
    originalFormInfo: {
      schema,
      uiSchema: originalUISchema,
      formData: originalFormData,
      validations,
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

  const onSubmitHashRef = getHashCodeFromXHRDef({
    eventName: 'onsubmit',
    fieldPath: 'ui:page',
    xhrSchema,
  });

  const isFormLoading = xhrProgress && hashRef && xhrProgress[hashRef];

  const isFormSubmitting = xhrProgress && onSubmitHashRef && xhrProgress[onSubmitHashRef];

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
        inProgress={uiSchema['ui:page']?.isFormSubmitting || isFormSubmitting}
        inProgressValue={uiSchema['ui:page']?.inProgressText}
      />
  );
  
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(theme ? { ...defaultTheme, ...theme } : defaultTheme)}>
        <Paper className={classes.root} style={uiSchema && uiSchema['ui:page'] ? uiSchema['ui:page'].style : {}}>
          {
            !isFormLoading && (actionButtonPos === 'top' && !hasPageLayoutSteps) && (
              <RenderFormButtons />
            )
          }
          <LocalizationProvider dateAdapter={AdapterMoment}>
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
          </LocalizationProvider>
          {
            !isFormLoading && (!actionButtonPos && !hasPageLayoutSteps) && (
              <RenderFormButtons />
            )
          }
        </Paper>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Form;
