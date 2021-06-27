// Mutations
import { formMutations, stepperMutations } from './mutations';

// Config
import FORM_STATE_CONFIG from './config';

// GUARDS
import GUARDS from './form-state.guards';

const addFormFieldStatesBasedOnPath = (getPath) => {
  const arrayTypeStates = {};
  Object.values(
    FORM_STATE_CONFIG.FORM_STATE_ARRAY_EVENTS,
  ).forEach((arrayVal) => {
    arrayTypeStates[arrayVal] = { 
      target: FORM_STATE_CONFIG.FORM_STATES.DIRTY,
      actions: ['updateArrayData'],
    };
  });
  
  const genericTypeStates = {
    [FORM_STATE_CONFIG.FORM_STATE_EVENTS.UPDATE]: [
      {
        target: FORM_STATE_CONFIG.FORM_STATES.DIRTY,
        cond: GUARDS.isUpdatedField(getPath),
        actions: ['updateData'],
      },
      {
        target: FORM_STATE_CONFIG.FORM_STATES.INVALID,
        actions: ['updateData', 'updateErrorData'],
      },
    ],
    [FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.UPDATE_FORM_ON_XHR_COMPLETE]: {
      target: FORM_STATE_CONFIG.FORM_STATES.DIRTY,
      actions: ['updateXHRData'],
    },
    [FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.UPDATE_XHR_PROGRESS]: {
      target: FORM_STATE_CONFIG.FORM_STATES.LOADING,
      actions: ['updateXHRProgress'],
    },
    [FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.ERROR_XHR_PROGRESS]: {
      target: FORM_STATE_CONFIG.FORM_STATES.INVALID,
      actions: ['updateErrorXHRProgress'],
    },
    [FORM_STATE_CONFIG.FORM_STATE_ERROR_EVENTS.ERROR]: {
      target: FORM_STATE_CONFIG.FORM_STATES.INVALID,
      actions: ['updateErrorData'],
    },
    [FORM_STATE_CONFIG.FORM_STATE_ERROR_EVENTS.NO_ERRORS]: {
      target: FORM_STATE_CONFIG.FORM_STATES.DIRTY,
      actions: ['updateErrorData'],
    },
    [FORM_STATE_CONFIG.STEPPER_STATE_EVENTS.ON_STEP_CHANGE]: {
      target: FORM_STATE_CONFIG.FORM_STATES.DIRTY,
      actions: ['updateActiveStep'],
    },
    [FORM_STATE_CONFIG.FORM_STATE_TAB_EVENTS.UPDATE_TAB_INDEX]: {
      target: FORM_STATE_CONFIG.FORM_STATES.DIRTY,
      actions: ['updateTabIndex'],
    },
  };
  
  const sharedStates = {
    ...arrayTypeStates,
    ...genericTypeStates,
  };

  const submitState = {
    [FORM_STATE_CONFIG.FORM_STATE_SUBMIT_EVENT]: { target: FORM_STATE_CONFIG.FORM_STATES.SUBMITTED },
  };
  
  const stateDefinition = {
    initial: FORM_STATE_CONFIG.FORM_STATES.INITIAL,
    states: {
      [FORM_STATE_CONFIG.FORM_STATES.INITIAL]: {
        on: {
          ...sharedStates,
          ...submitState,
        },
      },
      [FORM_STATE_CONFIG.FORM_STATES.LOADING]: {
        on: {
          ...sharedStates,
          ...submitState,
        },
      },
      [FORM_STATE_CONFIG.FORM_STATES.INVALID]: {
        on: {
          ...sharedStates,
        },
      },
      [FORM_STATE_CONFIG.FORM_STATES.DIRTY]: {
        on: {
          ...sharedStates,
          ...submitState,
        },
      },
      disabled: {
        type: 'final',
      },
      [FORM_STATE_CONFIG.FORM_STATES.SUBMITTED]: {
        type: 'final',
      },
    },
  };
  // console.log('stateDefinition is', stateDefinition);
  return stateDefinition;
};

const createFormFieldStates = ({
  schema,
}) => ({
  id: 'formMachine',
  initial: 'clean',
  type: 'parallel',
  states: {
    formUI: {
      ...addFormFieldStatesBasedOnPath(''),
    },
  },
});

export { formMutations, stepperMutations };

export default createFormFieldStates;
