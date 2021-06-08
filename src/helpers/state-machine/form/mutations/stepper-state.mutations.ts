// Library
import { assign, EventObject } from 'xstate';

// Types
import { FormContext } from '../../types/form-state-machine.type';

const StepperMutations = {
  updateActiveStep: assign({
    activeStep: (context: FormContext, event: EventObject & { stepName: string }) => Object.keys(
      context.formSchema.properties,
    ).indexOf(event.stepName),
  }),
};

export default StepperMutations;
