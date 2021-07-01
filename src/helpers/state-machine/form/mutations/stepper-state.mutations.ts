// Library
import { assign, EventObject } from 'xstate';

// Types
import { FormContext } from '../../types/form-state-machine.type';

const StepperMutations = {
  updateActiveStep: assign({
    activeStep: (context: FormContext, event: EventObject & { stepName: string }) => Object.keys(
      context.formSchema.properties,
    ).indexOf(event.stepName),
    hasError: (context: FormContext, event: EventObject & { hasError: any }) => false,
    validation: (context: FormContext, event: EventObject & { validation: any }) => (
      context.hasXHRError ? context.validation : event.validation
    ),
  }),
};

export default StepperMutations;
