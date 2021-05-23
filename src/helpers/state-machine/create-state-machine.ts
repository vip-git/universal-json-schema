// Library
import { createMachine } from 'xstate';
import { get } from 'lodash';

// Machines
import createFormFieldStates, { formMutations } from './states/form';
import createStepperStates, { stepperMutations } from './states/stepper';

// Types
import { FormContext } from './types/form-state-machine.type';

interface XStateObj {
  initial: string;
  type?: 'final' | 'parallel' | 'atomic' | 'compound' | 'history';
  states: any; // Should be defined in detail later
}

const STATES = {
  STEPPER: (schema) => createStepperStates({
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
  formData,
  uiData,
  effects,
}) => {
  const { updateArrayData, updateData } = formMutations;
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
      activeStep: 0,
    },
    ...states,
  }, {
    actions: {
      updateData,
      updateArrayData,
      updateActiveStep,
    },
  });
};

export default createStateMachine;
