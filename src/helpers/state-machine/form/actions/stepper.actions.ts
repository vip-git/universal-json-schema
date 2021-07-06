// config
import STEPPER_STATE_CONFIG from '../config';

// Helpers
import Utils from '../../../utils';

// State Helpers
import isFormSchemaStateValid from '../../helpers/is-form-schema-state-valid';

// Types
import { StateMachineInstance } from '../../types/form-state-machine.type';

const useStepperActions = () => {
  const { 
    STEPPER_ACTIONS: { DO_STEP_CHANGE },
    STEPPER_STATE_EVENTS: { ON_STEP_CHANGE },
  } = STEPPER_STATE_CONFIG;

  const getValidStepperActionToExecute = (
    state: StateMachineInstance,
  ) => {
    const executable = [];

    const CHANGE_ACTIVE_STEP_CONDITION = {
      condition: state.event.type.includes(ON_STEP_CHANGE),
      equals: true,
      callback: () => executable.push(DO_STEP_CHANGE),
    };

    Utils.executeConditions([
      { ...CHANGE_ACTIVE_STEP_CONDITION },
    ]);

    return executable;
  };

  const executeStepperActions = ({ buttonDisabled }) => ({
    [DO_STEP_CHANGE]: ({
      stateMachineService,
      state,
    }) => {
      const {
        formSchema: currentSchema,
        formData: currentData,
        uiData: currentUIData,
        uiSchema: currentUISchema,
        validation,
        activeStep,
      } = state.context;
      
      const stepName = Object.keys(currentSchema.properties)[activeStep];

      const { schemaErrors, transformedSchema } = isFormSchemaStateValid({
        stateMachineService,
        schema: currentSchema.properties[stepName],
        uiSchema: currentUISchema,
        validation,
        data: currentData[stepName],
        onError: state.context.effects.onError,
        buttonDisabled,
        isStepper: true,
      });

      state.context.effects.onChange({
        formData: currentData, 
        uiData: currentUIData,
        uiSchema: currentUISchema, 
        schemaErrors,
        validSchema: transformedSchema,
      });
    },
  });

  return {
    executeStepperActions,
    getValidStepperActionToExecute,
  };
};

export default useStepperActions;
