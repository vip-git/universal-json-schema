// Import
import React from 'react';

// Internal
import useFormActions from './form.actions';
import useStepperActions from './stepper.actions';

// config
import FORM_STATE_CONFIG from '../config';

// Types
import { StateMachineInstance } from '../../types/form-state-machine.type';

interface ExecuteFormActions {
    state: StateMachineInstance;
    stateMachineService: any;
}

const useActions = ({
  isPartialUI,
}) => {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const { 
    executeStepperActions,
    getValidStepperActionToExecute,
  } = useStepperActions();

  const {
    getValidActionToExecute,
    executeFormActions,
  } = useFormActions({ isPartialUI });

  const executeAction = {
    [FORM_STATE_CONFIG.FORM_ACTIONS.DISABLE_FORM_SUBMIT]: () => setButtonDisabled(true),
    [FORM_STATE_CONFIG.FORM_ACTIONS.ENABLE_FORM_SUBMIT]: () => setButtonDisabled(false),
    ...executeFormActions({ buttonDisabled }),
    ...executeStepperActions({ buttonDisabled }),
  };

  const executeFormActionsByState = ({
    state,
    stateMachineService,
  }: ExecuteFormActions) => [
    ...getValidStepperActionToExecute(state),
    ...getValidActionToExecute(state),
  ].forEach((action) => executeAction[action]({
    state,
    stateMachineService,
  }));

  return {
    executeFormActionsByState,
    buttonDisabled,
  };
};

export default useActions;
