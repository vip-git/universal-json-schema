// State Machine Helpers
import { 
    useFormStateMachine,
    useFormEvents,
    useStepperEvents,
    getHashCodeFromXHRDef,
  } from '@helpers/state-machine/form/hooks';

export const RulesEngine = ({
    formData: originalFormData = {},
    schema = {},
    xhrSchema = {},
    uiSchema: originalUISchema = {},
    validations = {},
    prefixId = '',
    submitOnEnter = () => {},
    onChange = () => {},
    onSubmit = () => {},
    onStepNext: givenOnStepNext = () => {},
    onStepBack: givenOnStepBack = () => {},
    onStepSkip: givenOnStepSkip = () => {},
    onStepReset: givenOnStepReset = () => {},
    onError = () => {},
    interceptors = {}
}) => {
    // const {
    //     formInfo: {
    //       formSchemaXHR,
    //       uiData,
    //       uiSchema,
    //       formData,
    //       activeStep,
    //       xhrProgress,
    //       validation,
    //     },
    //     loadingState,
    //     buttonDisabled,
    //     stateMachineService,
    //   } = useFormStateMachine({
    //     xhrSchema,
    //     interceptors,
    //     originalFormInfo: {
    //       schema,
    //       uiSchema: originalUISchema,
    //       formData: originalFormData,
    //       validations,
    //       xhrSchema,
    //     },
    //     effects: {
    //       onChange,
    //       onError,
    //     },
    //   });
    
    //   // Form Events
    //   const {
    //     onTabChange,
    //     onMoveItemUp,
    //     onMoveItemDown,
    //     onDeleteItem,
    //     onAddItem,
    //     onAddNewProperty,
    //     onRemoveProperty,
    //     onUpdateKeyProperty,
    //     onFormValuesChange,
    //     onFormSubmit,
    //     onXHRSchemaEvent,
    //     handleKeyEnter,
    //   } = useFormEvents({
    //     validation,
    //     stateMachineService,
    //     formData,
    //     schema,
    //     uiData, 
    //     uiSchema, 
    //     xhrSchema,
    //     interceptors,
    //     submitOnEnter,
    //     onSubmit,
    //   });
    
    //   // Stepper Events
    //   const {
    //     onStepNext,
    //     onStepBack,
    //     onStepSkip,
    //     // onStepReset,
    //   } = useStepperEvents({
    //     stateMachineService,
    //     validation,
    //     formData,
    //     schema,
    //     uiData, 
    //     uiSchema,
    //     xhrSchema,
    //     interceptors,
    //     onSubmit,
    //     givenOnStepNext,
    //     givenOnStepReset,
    //     givenOnStepBack,
    //     givenOnStepSkip,
    //   });
    
      // const id = prefixId; // || generate();
    
      // const hashRef = getHashCodeFromXHRDef({
      //   eventName: 'onload',
      //   fieldPath: 'ui:page',
      //   xhrSchema,
      // });
    
      // const onSubmitHashRef = getHashCodeFromXHRDef({
      //   eventName: 'onsubmit',
      //   fieldPath: 'ui:page',
      //   xhrSchema,
      // });
    
      // const isFormLoading = xhrProgress && hashRef && xhrProgress[hashRef];
    
      // const isFormSubmitting = xhrProgress && onSubmitHashRef && xhrProgress[onSubmitHashRef];
    
      // const hasPageLayoutTabs = uiSchema['ui:page'] 
      //                             && uiSchema['ui:page']['ui:layout'] 
      //                             && uiSchema['ui:page']['ui:layout'] === 'tabs';
    
      // const hasPageLayoutSteps = uiSchema['ui:page'] 
      //                             && uiSchema['ui:page']['ui:layout'] 
      //                             && uiSchema['ui:page']['ui:layout'] === 'steps';

      const rulesParser = (condition) => false; 
      
      return {
        rulesParser,
        // isFormLoading,
        // isFormSubmitting,
        // hasPageLayoutTabs,
        // hasPageLayoutSteps,
      }
}
