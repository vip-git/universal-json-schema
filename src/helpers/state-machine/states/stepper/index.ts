// Machines
import { createParallelFormFieldStates } from '../form';

// Helpers
import getDefinitionSchemaFromRef from '../../../get-definition-schema';

const createStepperStates = ({
  schema,
}) => {
  const givenSchema = JSON.parse(JSON.stringify(schema));
  //   Object.keys(givenSchema.properties).forEach((propName) => {
  //     const states = {};
  //     const parsedSchema = getDefinitionSchemaFromRef(givenSchema.definitions, givenSchema.properties[propName], {});
  //     const formFieldStates = createParallelFormFieldStates({
  //       schema: parsedSchema,
  //       states: new Map(),
  //     });
    
  //     formFieldStates.forEach((state, stateKey) => {
  //       states[stateKey] = state;
  //     });

  //     console.log('formFieldStates is', formFieldStates);
  //     console.log('states is', states);
  //   });
  const fieldStates = {
    'clean': {
      'on': {
        'update': {
          'target': 'dirty',
          'actions': [
            'updateData',
          ],
        },
        'error': {
          'target': 'invalid',
        },
        'submit': {
          'target': 'submitted',
        },
      },
    },
    'invalid': {
      'on': {
        'update': {
          'target': 'dirty',
          'actions': [
            'updateData',
          ],
        },
        'error': {
          'target': 'invalid',
        },
      },
    },
    'dirty': {
      'on': {
        'update': {
          'target': 'dirty',
          'actions': [
            'updateData',
          ],
        },
        'error': {
          'target': 'invalid',
        },
        'submit': {
          'target': 'submitted',
        },
      },
    },
    'disabled': {
      'type': 'final',
    },
    'submitted': {
      'type': 'final',
    },
  };
  const stepperState = {
    initial: 'inactive',
    states: {
      inactive: {
        on: {
          'activate': {
            target: 'active',
          },
          'submit': { target: 'submitted' },
        },
      },
      active: {
        initial: 'clean',  
        on: {
          'deactivate': {
            target: 'inactive',
          },
          'submit': { target: 'submitted' },
        },
        states: {
          ...fieldStates,
        },
      },
      disabled: {
        type: 'final',
      },
      submitted: {
        type: 'final',
      },
    },
  };
  return stepperState;
};

export default createStepperStates;
