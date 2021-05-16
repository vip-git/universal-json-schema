// Library
import React from 'react';
import { interpret } from 'xstate';

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
  schema: any;
  validations: any;
  originalFormInfo: {
    formData: any;
    uiSchema: any;
  };
  effects: {
    onChange: Function;
    onError: Function;
  }
}

const useFormStateMachine = ({
  xhrSchema,
  schema,
  originalFormInfo: givenOriginalFormInfo,
  validations,
  effects: {
    onChange,
    onError: originalOnError,
  },
}: FormStateMachineProps) => {
  const originalFormInfo = {
    ...givenOriginalFormInfo,
    uiData: setUIData({}, Object.keys(schema.properties || {}), givenOriginalFormInfo.uiSchema, schema),
  };
  const givenFormInfo = !formStateMachine ? originalFormInfo : {
    // eslint-disable-next-line no-underscore-dangle
    uiData: stateMachineService._state.context.uiData,
    // eslint-disable-next-line no-underscore-dangle
    formData: stateMachineService._state.context.formData,
    // eslint-disable-next-line no-underscore-dangle
    uiSchema: stateMachineService._state.context.uiSchema,
  };
  const [activeStep, setActiveStep] = React.useState(0);
  const [formInfo, setFormInfo] = React.useState(givenFormInfo);
  const [loadingState, setLoadingState] = React.useState(null);
  const validation = getValidationResult(schema, formInfo.uiSchema, formInfo.formData, validations);
  const { 
    executeFormActionsByState,
    buttonDisabled,
  } = useFormActions();

  const startMachine = () => {
    if (!formStateMachine && !stateMachineService) {
      const { uiSchema, formData, uiData } = originalFormInfo;
      formStateMachine = createStateMachine({
        uiSchema,
        xhrSchema,
        formSchema: schema,
        formData,
        uiData,
        validation,
        effects: {
          setFormInfo,
          onChange,
          onError: originalOnError,
        },
      });
      stateMachineService = interpret(formStateMachine).onTransition((state) => executeFormActionsByState({
        state,
        stateMachineService,
      }));
      stateMachineService.start();
    }
  };
  
  startMachine();
  
  return {
    formInfo,
    stateMachineService,
    setFormInfo,
    setLoadingState,
    setActiveStep,
    activeStep,
    buttonDisabled,
    validation,
    loadingState,
  };
};

export default useFormStateMachine;
