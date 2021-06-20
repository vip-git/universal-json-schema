// Library
import React from 'react';
import { interpret } from 'xstate';
import { get, isEqual } from 'lodash';

// Helpers
import createStateMachine from '../../create-state-machine';
import getValidationResult from '../../../validation';
import {
  setUIData,
} from '../../../update-form-data';
import persistXHRCall from '../../helpers/persist-xhr-call';

// Hooks
import useFormActions from '../actions';
import { StateMachineInstance } from '../../types/form-state-machine.type';

let formStateMachine = null;
let stateMachineService = null;

interface FormStateMachineProps {
  xhrSchema: any;
  interceptors: any;
  originalFormInfo: {
    schema: any;
    formData: any;
    validations: any;
    uiSchema: any;
    activeStep?: number;
    validation?: any;
    xhrSchema: any;
    xhrProgress?: any;
    formSchemaXHR?: any;
    xstate?: any;
  };
  effects: {
    onChange: Function;
    onError: Function;
  }
}

const useFormStateMachine = ({
  xhrSchema,
  originalFormInfo: givenOriginalFormInfo,
  interceptors,
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
    formSchemaXHR: stateMachineService._state.context.formSchemaXHR,
    // eslint-disable-next-line no-underscore-dangle
    xhrSchema: stateMachineService._state.context.xhrSchema,
    // eslint-disable-next-line no-underscore-dangle
    xhrProgress: stateMachineService._state.context.xhrProgress,
    // eslint-disable-next-line no-underscore-dangle
    activeStep: stateMachineService._state.context.activeStep || 0,
    // eslint-disable-next-line no-underscore-dangle
    validation: stateMachineService._state.context.validation,
    // eslint-disable-next-line no-underscore-dangle
    xstate: stateMachineService._state.value,
  } : {};
  const givenFormInfo = !formStateMachine ? originalFormInfo : stateFormInfo;
  const [loadingState, setLoadingState] = React.useState(null);
  const isStepperUI = (uiSchema) => get(
    uiSchema, 'ui:page.ui:layout',
  ) === 'steps';
  const { 
    executeFormActionsByState,
    buttonDisabled,
  } = useFormActions({
    isStepperUI,
  });

  const startMachine = (givenInfo: { uiSchema: any; validations: any; formData: any; uiData: any; schema: any; }) => {
    if (!formStateMachine && !stateMachineService) {
      const { uiSchema, formData, uiData, schema, validations } = givenInfo;
      const validation = getValidationResult(
        schema, 
        uiSchema, 
        formData, 
        validations,
      );
      formStateMachine = createStateMachine({
        uiSchema,
        xhrSchema,
        formSchema: schema,
        formData,
        uiData,
        validation,
        validations,
        effects: {
          onChange,
          onError: originalOnError,
        },
      });
      stateMachineService = interpret(
        formStateMachine, { devTools: true },
      ).onTransition((state: StateMachineInstance) => executeFormActionsByState({
        state,
        stateMachineService,
      }));
      stateMachineService.start();
      if (!isEqual(originalFormInfo.schema, stateFormInfo.schema)) {
        persistXHRCall({
          fieldPath: 'ui:page',
          eventName: 'onload',
          xhrSchema,
          stateMachineService,
          formData: givenFormInfo.formData,
          uiData: givenFormInfo.uiData,
          uiSchema: givenFormInfo.uiSchema,
          schema: givenFormInfo.schema,
          interceptors,
        }) as Promise<void>;
      }
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
    loadingState,
    isStepperUI,
  };
};

export default useFormStateMachine;
