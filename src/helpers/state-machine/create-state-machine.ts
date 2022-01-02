// Library
import { createMachine } from 'xstate';
import { get } from 'lodash';

// Helpers
import { flattenSchemaPropFromDefinitions } from '../get-definition-schema';

// Machines
import createFormFieldStates, { stepperMutations, formMutations } from './form';

// Types
import type { FormContext } from './types/form-state-machine.type';

interface XStateObj {
  initial: string;
  type?: 'final' | 'parallel' | 'atomic' | 'compound' | 'history';
  states: any; // Should be defined in detail later
}

const STATES = {
  STEPPER: (schema) => createFormFieldStates({
    schema,
  }) as XStateObj,
  FORM_FIELDS: (schema) => createFormFieldStates({
    schema,
  }) as XStateObj, 
};

const getStatesByUISchema = (uiSchema: any, schema: any) => (get(
  uiSchema, 'ui:page.ui:layout',
) === 'steps' 
  ? STATES.STEPPER(schema) 
  : STATES.FORM_FIELDS(schema)
);

const createStateMachine = ({
  uiSchema,
  formSchema,
  xhrSchema,
  validation,
  validations,
  formData,
  uiData,
  effects,
  hasError,
}) => {
  const { 
    updateArrayData,
    updateData,
    updateXHRData,
    updateXHRProgress,
    updateTabIndex,
    updateErrorData,
    updateErrorXHRProgress,
  } = formMutations;
  const { updateActiveStep } = stepperMutations;
  
  const states: XStateObj = getStatesByUISchema(uiSchema, formSchema);

  // console.log('states are', JSON.stringify(states));
 
  return createMachine<FormContext, any>({
    context: {
      uiSchema,
      formSchema,
      xhrSchema,
      formData,
      uiData,
      effects,
      validation,
      validations,
      parsedFormSchema: formSchema.definitions ? flattenSchemaPropFromDefinitions(formSchema, formData) : formSchema,
      xhrProgress: {},
      formSchemaXHR: {},
      hasError,
      hasXHRError: false,
      activeStep: 0,
      lastField: '',
    },
    ...states,
  }, {
    actions: {
      updateData,
      updateXHRData,
      updateXHRProgress,
      updateArrayData,
      updateActiveStep,
      updateTabIndex,
      updateErrorData,
      updateErrorXHRProgress,
    },
  });
};

export default createStateMachine;
