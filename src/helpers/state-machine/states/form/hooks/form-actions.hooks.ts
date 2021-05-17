// Library
import React from 'react';

// Helpers
import removeEmptyObjects from '../../../../remove-empty-values';
import Utils from '../../../../utils';

// State Helpers
import isFormSchemaStateValid from '../../../helpers/is-form-schema-state-valid';
  
// config
import { FORM_STATE_CONFIG } from '../form-state.config';

// Stepper Actions
import useStepperActions from '../../stepper/hooks/stepper.actions.hooks';

// Types
import { StateMachineInstance } from '../../../types/form-state-machine.type';

interface ExecuteFormActions {
  state: StateMachineInstance;
  stateMachineService: any;
}

/**
 * @description
 * This function acts more like a mini rules engine currenly only 2 rules.
 * 1. To Execute updates when state changes are seen.
 * 2. To Disable submit button when state detects invalid fields.
 * 3. To Enable submit button when state detects all valid fields.
 * 4. To Propagate onChange event on formProps when update is done.
 * @param param0 
 * @returns 
 */
const useFormActions = ({
  isStepperUI,
}) => {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const { 
    executeStepperActions,
    getValidStepperActionToExecute,
  } = useStepperActions(buttonDisabled);
  const { 
    FORM_ACTIONS: actions, 
    FORM_STATE_EVENTS, 
    FORM_STATE_ARRAY_EVENTS, 
    FORM_STATE_ERROR_EVENTS,
  } = FORM_STATE_CONFIG;

  const getValidActionToExecute = (
    state: StateMachineInstance,
  ) => {
    const executable = [];

    const formValidCondition = isStepperUI() ? Object.values(
      state.value[Object.keys(state.value)[0]],
    ).includes(FORM_STATE_ERROR_EVENTS.INVALID) 
      : Object.values(state.value).includes(FORM_STATE_ERROR_EVENTS.INVALID);

    const PROPAGATE_ON_CHANGE_CONDITION = {
      condition: typeof state.context.effects.onChange,
      equals: 'function',
      callback: () => executable.push(actions.PROPOGATE_ONCHANGE_EVENT),
    };

    const FORM_UPDATE_CONDITION = {
      condition: Object.values({
        ...FORM_STATE_EVENTS,
        ...FORM_STATE_ARRAY_EVENTS,
      }).includes(state.event.type),
      equals: true,
      callback: () => executable.push(actions.DO_FORM_UPDATE),
      nestedCondition: [{ ...PROPAGATE_ON_CHANGE_CONDITION }],
    };

    const ENABLE_FORM_CONDITION = {
      condition: formValidCondition,
      equals: false,
      callback: () => executable.push(actions.ENABLE_FORM_SUBMIT),
    };

    const DISABLE_FORM_CONDITION = {
      condition: formValidCondition,
      equals: true,
      callback: () => executable.push(actions.DISABLE_FORM_SUBMIT),
    };

    Utils.executeConditions([
      { ...FORM_UPDATE_CONDITION },
      { ...ENABLE_FORM_CONDITION },
      { ...DISABLE_FORM_CONDITION },
    ]);

    return executable;
  };

  const executeAction = {
    [actions.DISABLE_FORM_SUBMIT]: () => setButtonDisabled(true),
    [actions.ENABLE_FORM_SUBMIT]: () => setButtonDisabled(false),
    [actions.PROPOGATE_ONCHANGE_EVENT]: ({
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
      const schema = isStepperUI() 
        ? currentSchema.properties[stepName] 
        : currentSchema;
      const data = isStepperUI() ? currentData[stepName] : currentData;
      const { schemaErrors, transformedSchema } = isFormSchemaStateValid({
        stateMachineService,
        schema,
        uiSchema: currentUISchema,
        validation,
        data,
        onError: state.context.effects.onError,
        buttonDisabled,
        setButtonDisabled,
      });
      state.context.effects.onChange({ 
        formData: currentData, 
        uiData: currentUIData,
        uiSchema: currentUISchema, 
        schemaErrors,
        validSchema: transformedSchema,
      });
    },
    [actions.DO_FORM_UPDATE]: ({
      state,
    }) => {
      const {
        formData: currentData, 
        uiData: currentUIData, 
        uiSchema: currentUISchema,
      } = state.context;
      const finalData = removeEmptyObjects(currentData, state.context.formSchema);
      state.context.effects.setFormInfo(
        {
          formData: finalData,
          uiData: currentUIData,
          uiSchema: currentUISchema,
        },
      );
    },
    ...executeStepperActions,
  };

  const executeFormActionsByState = ({
    state,
    stateMachineService,
  }: ExecuteFormActions) => [
    ...getValidStepperActionToExecute(state),
    ...getValidActionToExecute(state),
  ].forEach((action) => {
    console.log('executing action', action, 'for state', state);
    executeAction[action]({
      state,
      stateMachineService,
    });
  });

  return {
    executeFormActionsByState,
    buttonDisabled,
  };
};

export default useFormActions;
