// Library
import React from 'react';
import { interpret, Interpreter } from 'xstate';
import { get, isEqual, has } from 'lodash';

// Helpers
import createStateMachine from '../../create-state-machine';
import { hasSchemaErrors } from '../../../validation';
import {
  setUIData,
} from '../../../update-form-data';
import persistXHRCall from '../../helpers/persist-xhr-call';

// Hooks
import useFormActions from '../actions';
import { StateMachineInstance } from '../../types/form-state-machine.type';

interface FormContext {
  uiData?: any;
  schema: any;
  formSchema?: any;
  formData: any;
  validations: any;
  uiSchema: any;
  activeStep?: number;
  validation?: any;
  xhrSchema: any;
  xhrProgress?: any;
  formSchemaXHR?: any;
  xstate?: any;
  hasError?: boolean;
  hasXHRError?: boolean;
}

let formStateMachine = null;
let stateMachineService: Interpreter<Record<string, any> | FormContext, any> = null;

interface FormStateMachineProps {
  xhrSchema: any;
  interceptors: any;
  originalFormInfo: FormContext;
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
    uiData: stateMachineService.state.context.uiData,
    formData: stateMachineService.state.context.formData,
    uiSchema: stateMachineService.state.context.uiSchema,
    schema: stateMachineService.state.context.formSchema,
    formSchemaXHR: stateMachineService.state.context.formSchemaXHR,
    xhrSchema: stateMachineService.state.context.xhrSchema,
    xhrProgress: stateMachineService.state.context.xhrProgress,
    activeStep: stateMachineService.state.context.activeStep || 0,
    validation: stateMachineService.state.context.validation,
    xstate: stateMachineService.state.value,
    hasError: stateMachineService.state.context.hasError || stateMachineService.state.context.hasXHRError,
  } : {};
  const givenFormInfo = !formStateMachine ? originalFormInfo : stateFormInfo;
  const [loadingState] = React.useState(null);
  const isPartialUI = (uiSchema) => get(
    uiSchema, 'ui:page.ui:layout',
  ) === 'steps' || get(
    uiSchema, 'ui:page.ui:layout',
  ) === 'tabs';
  const { 
    executeFormActionsByState,
    buttonDisabled,
  } = useFormActions({
    isPartialUI,
  });

  const startMachine = (givenInfo: FormContext) => {
    if (!formStateMachine && !stateMachineService) {
      const { uiSchema, formData, uiData, schema, validations, activeStep } = givenInfo;
      const {
        validation,
        schemaErrors,
        isError,
      } = hasSchemaErrors({
        currentSchema: schema,
        currentUISchema: uiSchema,
        currentData: formData,
        formSchemaXHR: {},
        validations,
        activeStep,
        stateMachineService,
        state: stateMachineService?.state,
        buttonDisabled,
        isPartialUI,
      });
      formStateMachine = createStateMachine({
        uiSchema,
        xhrSchema,
        formSchema: schema,
        formData,
        uiData,
        validation,
        validations,
        hasError: (has(schemaErrors, 'length') || isError),
        effects: {
          onChange,
          onError: originalOnError,
        },
      });
      stateMachineService = interpret(
        formStateMachine, { devTools: process.env.NODE_ENV === 'development' },
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
          formData: originalFormInfo.formData,
          uiData: originalFormInfo.uiData,
          uiSchema: originalFormInfo.uiSchema,
          schema: originalFormInfo.schema,
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
    buttonDisabled: givenFormInfo?.hasError || false,
    loadingState,
    isPartialUI,
  };
};

export default useFormStateMachine;
