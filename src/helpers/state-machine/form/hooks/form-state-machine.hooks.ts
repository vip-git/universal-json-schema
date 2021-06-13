// Library
import React from 'react';
import { interpret } from 'xstate';
import { get, isEqual, has, set } from 'lodash';

// Helpers
import createStateMachine from '../../create-state-machine';
import getValidationResult from '../../../validation';
import { 
  hashCode, 
  mapData, 
  getDefinitionsValue,
} from '../../../transform-schema';
import executeXHRCall from '../../../execute-xhr-call';
import {
  setUIData,
} from '../../../update-form-data';

// Hooks
import useFormActions from '../actions';
import { StateMachineInstance } from '../../types/form-state-machine.type';

// Config
import FORM_STATE_CONFIG from '../config';

let formStateMachine = null;
let stateMachineService = null;

interface FormStateMachineProps {
  xhrSchema: any;
  validations: any;
  interceptors: any;
  originalFormInfo: {
    schema: any;
    formData: any;
    uiSchema: any;
    activeStep?: number;
    xhrSchema: any;
    xhrProgress: boolean;
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
  validations,
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
    xhrSchema: stateMachineService._state.context.xhrSchema,
    // eslint-disable-next-line no-underscore-dangle
    xhrProgress: stateMachineService._state.context.xhrProgress,
    // eslint-disable-next-line no-underscore-dangle
    activeStep: stateMachineService._state.context.activeStep || 0,
    // eslint-disable-next-line no-underscore-dangle
    xstate: stateMachineService._state.value,
  } : {};
  const givenFormInfo = !formStateMachine ? originalFormInfo : stateFormInfo;
  const [loadingState, setLoadingState] = React.useState(null);
  const [formId, setFormId] = React.useState(null);
  // const iniUiData = setUIData({}, Object.keys(schema.properties || {}), uiSchema, schema);
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
      ).onTransition((state: StateMachineInstance) => executeFormActionsByState({
        state,
        stateMachineService,
      }));
      stateMachineService.start();
    }

    /**
     * Todo: Try to figure out a way to remove this if condition
     */
    if (
      !isEqual(hashCode(JSON.stringify(givenFormInfo.schema)), formId) 
      && !givenFormInfo.xhrProgress
    ) {
      if (xhrSchema 
          && has(xhrSchema, 'ui:page.onload.xhr:datasource.url')
          && has(xhrSchema, 'ui:page.onload.xhr:datasource.method')
          && has(xhrSchema, 'ui:page.onload.xhr:datasource.map:results')
      ) {
        const mappedResults = xhrSchema['ui:page'].onload['xhr:datasource']['map:results'];
        const resultsMappingInfo = mappedResults.includes('#/') 
          ? getDefinitionsValue(xhrSchema, mappedResults)
          : mappedResults;
        stateMachineService.send(
          FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.UPDATE_XHR_PROGRESS, 
          true,
        );
        executeXHRCall({
          type: 'onload',
          url: xhrSchema['ui:page'].onload['xhr:datasource'].url,
          method: xhrSchema['ui:page'].onload['xhr:datasource'].method,
          onFailure: () => stateMachineService.send(
            FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.UPDATE_XHR_PROGRESS, 
            false,
          ),
          onSuccess: (xhrData: any[]) => {
            stateMachineService.send(
              FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.UPDATE_XHR_PROGRESS, 
              false,
            );
            const setData = (
              returnData,
              returnUIData,
            ) => {
              stateMachineService.send(
                FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.UPDATE_FORM_DATA,
                {
                  formData: returnData,
                },
              );
            };
              /** Send the update event here to final data */
            mapData(
              resultsMappingInfo,
              Array.isArray(xhrData) ? xhrData[0] : xhrData,
              givenFormInfo.formData,
              {}, // needs to be coming from uiSchema - this is uiData
              givenFormInfo.uiSchema,
              interceptors,
              givenFormInfo.schema,
              setData,
            );
          },
        }) as Promise<void>;
      }
      setFormId(hashCode(JSON.stringify(givenFormInfo.schema)));
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
