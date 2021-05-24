// Library
import React from 'react';
import { interpret } from 'xstate';
import { get, isEqual } from 'lodash';

// Helpers
import createStateMachine from '../../../create-state-machine';
import getValidationResult from '../../../../validation';
import {
  setUIData,
} from '../../../../update-form-data';

// Hooks
import useFormActions from './form-actions.hooks';

let formStateMachine = null;
let stateMachineService = null;

interface FormStateMachineProps {
  xhrSchema: any;
  validations: any;
  originalFormInfo: {
    schema: any;
    formData: any;
    uiSchema: any;
    activeStep?: number;
  };
  effects: {
    onChange: Function;
    onError: Function;
  }
}

const useFormStateMachine = ({
  xhrSchema,
  originalFormInfo: givenOriginalFormInfo,
  validations,
  effects: {
    onChange,
    onError: originalOnError,
  },
}: FormStateMachineProps) => {
  const originalFormInfo = {
    ...givenOriginalFormInfo,
    uiData: setUIData({}, 
      Object.keys(givenOriginalFormInfo.schema.properties || {}), 
      givenOriginalFormInfo.uiSchema, 
      givenOriginalFormInfo.schema,
    ),
  };
  const stateFormInfo = formStateMachine ? {
    // eslint-disable-next-line no-underscore-dangle
    uiData: stateMachineService._state.context.uiData,
    // eslint-disable-next-line no-underscore-dangle
    formData: stateMachineService._state.context.formData,
    // eslint-disable-next-line no-underscore-dangle
    uiSchema: stateMachineService._state.context.uiSchema,
    // eslint-disable-next-line no-underscore-dangle
    schema: stateMachineService._state.context.formSchema,
    // eslint-disable-next-line no-underscore-dangle
    activeStep: stateMachineService._state.context.activeStep || 0,
  } : {};
  const givenFormInfo = !formStateMachine ? originalFormInfo : stateFormInfo;
  const [loadingState, setLoadingState] = React.useState(null);
  const validation = getValidationResult(
    givenFormInfo.schema, 
    givenFormInfo.uiSchema, 
    givenFormInfo.formData, 
    validations,
  );
  const isStepperUI = (uiSchema) => get(
    uiSchema, 'ui:page.ui:layout',
  ) === 'steps';
  const { 
    executeFormActionsByState,
    buttonDisabled,
  } = useFormActions({
    isStepperUI,
  });

  const startMachine = (givenInfo: { uiSchema: any; formData: any; uiData: any; schema: any; }) => {
    if (!formStateMachine && !stateMachineService) {
      const { uiSchema, formData, uiData, schema } = givenInfo;
      formStateMachine = createStateMachine({
        uiSchema,
        xhrSchema,
        formSchema: schema,
        formData,
        uiData,
        validation,
        effects: {
          onChange,
          onError: originalOnError,
        },
      });
      stateMachineService = interpret(
        formStateMachine, { devTools: true },
      ).onTransition((state) => executeFormActionsByState({
        state,
        stateMachineService,
      }));
      stateMachineService.start();
    }
  };
  
  const condition = !isEqual(
    { 
      schema: originalFormInfo.schema, 
      uiSchema: originalFormInfo.uiSchema,
    }, 
    { 
      schema: stateFormInfo.schema,
      uiSchema: stateFormInfo.uiSchema,
    },
  );

  if (condition && formStateMachine && stateMachineService) {
    formStateMachine = null;
    stateMachineService = null;
  }

  startMachine(originalFormInfo);

  return {
    formInfo: givenFormInfo,
    stateMachineService,
    setLoadingState,
    buttonDisabled,
    validation,
    loadingState,
    isStepperUI,
  };
};

export default useFormStateMachine;
