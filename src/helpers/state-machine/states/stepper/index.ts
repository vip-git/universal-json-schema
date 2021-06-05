// Mutations
import stepperMutations from './stepper-state.mutations';

// config
import { STEPPER_STATE_CONFIG } from './stepper-state.config';

// Helpers
import { flattenDefinitionSchemaFromRef } from '../../../get-definition-schema';

const createStepperStates = ({
  schema,
}) => {
  const { STEPPER_STATE_EVENTS: { ON_STEP_CHANGE } } = STEPPER_STATE_CONFIG;
  const states = {};
  const givenSchema = JSON.parse(JSON.stringify(schema));
  const stepTransitions = {};
  // Object.keys(givenSchema.properties).forEach((propName) => {
  //   states[propName] = {
  //     states: {},
  //     on: {},
  //   };
  //   stepTransitions[`${propName}.${ON_STEP_CHANGE}`] = {
  //     target: `.${propName}`,
  //     actions: ['updateActiveStep'],
  //   };
  //   const parsedSchema = flattenDefinitionSchemaFromRef(givenSchema.definitions, givenSchema.properties[propName]);
  //   const formFieldStates = createParallelFormFieldStates({
  //     schema: parsedSchema,
  //     states: new Map(),
  //   });
    
  //   formFieldStates.forEach((state, stateKey) => {
  //     states[propName].initial = stateKey;
  //     states[propName].type = 'parallel';
  //     states[propName].states[stateKey] = {
  //       ...state,
  //     };
  //     states[propName].on[`${propName}.${stateKey}`] = {
  //       target: `.${stateKey}`,
  //     };
  //   });
  // });

  const stepperState = {
    id: 'stepMachine',
    initial: Object.keys(states)[0],
    states: {
      ...states,
    },
    on: {
      ...stepTransitions,
    },
  };
  return stepperState;
};

export { stepperMutations };

export default createStepperStates;
