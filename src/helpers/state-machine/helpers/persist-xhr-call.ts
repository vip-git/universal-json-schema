// Helpers
import { has } from 'lodash';
import executeXHRCall from '../../execute-xhr-call';
import getHashCodeFromXHRDef from './get-hashcode-from-xhr-def';
import {
  mapData,
  getDefinitionsValue,
} from '../../transform-schema';

// config
import FORM_STATE_CONFIG from '../form/config';

const isXHRAlreadyCalled = ({
  stateMachineService,
  hashRef,
// eslint-disable-next-line no-underscore-dangle
}) => !stateMachineService._state.context.xhrProgress 
// eslint-disable-next-line no-underscore-dangle
|| (stateMachineService._state.context.xhrProgress
  // eslint-disable-next-line no-underscore-dangle
  && !Object.keys(stateMachineService._state.context.xhrProgress).includes(hashRef.toString()));

const persistXHRCall = ({
  xhrSchema,
  stateMachineService,
  formData,
  uiData,
  uiSchema,
  schema,
  interceptors,
  fieldPath,
  eventName,
}) => {
  if (has(xhrSchema, `${fieldPath}.${eventName}.xhr:datasource`)) {
    const { url: eventUrl, method: eventMethod, payload } = xhrSchema[fieldPath][eventName]['xhr:datasource'];
    const hashRef = getHashCodeFromXHRDef({
      eventName,
      fieldPath,
      xhrSchema,
    });
    if (isXHRAlreadyCalled({
      hashRef,
      stateMachineService,
    })) {
      stateMachineService.send(
        FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.UPDATE_XHR_PROGRESS, 
        {
          status: true,
          hashRef,
        },
      );
      return executeXHRCall({
        type: eventName,
        url: eventUrl,
        method: eventMethod,
        payload,
        onFailure: () => stateMachineService.send(
          FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.UPDATE_XHR_PROGRESS, 
          {
            status: false,
            hashRef,
          },
        ),
        onSuccess: (xhrData: any[]) => {
          const xhrDt = Array.isArray(xhrData) ? xhrData[0] : xhrData;
          const mappedResults = xhrSchema[fieldPath][eventName]['xhr:datasource']['map:results'];
          const resultsMappingInfo = mappedResults.includes('#/') 
            ? getDefinitionsValue(xhrSchema, mappedResults)
            : mappedResults;
          stateMachineService.send(
            FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.UPDATE_XHR_PROGRESS, 
            {
              status: false,
              hashRef,
            },
          );
          const setData = (
            returnData,
            returnUIData,
          ) => {
            stateMachineService.send(
              FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.UPDATE_FORM_DATA,
              {
                formData: returnData,
                uiData: returnUIData,
              },
            );
          };
          /** Send the update event here to final data */
          mapData(
            resultsMappingInfo,
            xhrDt,
            formData,
            uiData,
            uiSchema,
            interceptors,
            schema,
            setData,
          );
        },
      });
    }
  }

  return false;
};

export default persistXHRCall;
