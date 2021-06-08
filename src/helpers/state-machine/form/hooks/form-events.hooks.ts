// Library
import { nanoid as generate } from 'nanoid';

// Lodash
import set from 'lodash/set';
import get from 'lodash/get';
import has from 'lodash/has';

// Helpers
import updateFormData, { 
  addListItem, 
  removeListItem, 
  moveListItem,
  removeValueFromSpec,
  updateKeyFromSpec,
} from '../../../update-form-data';
import { isEmptyValues } from '../../../remove-empty-values';
import { mapData, setNestedPayload, getDefinitionsValue } from '../../../transform-schema';
import executeXHRCall from '../../../execute-xhr-call';

// Config
import FORM_STATE_CONFIG from '../config';
  
const useFormEvents = ({
  stateMachineService,
  validation,
  formData,
  setLoadingState,
  loadingState,
  schema,
  uiData, 
  uiSchema,
  xhrSchema,
  interceptors,
  submitOnEnter,
  onSubmit,
  onChange,
  onError,
}) => {
  const onMoveItemUp = (path: string, idx: number) => () => stateMachineService.send(
    FORM_STATE_CONFIG.FORM_STATE_ARRAY_EVENTS.MOVE_ITEM_UP,
    { 
      updateArrayFN: (contextFormData) => moveListItem(contextFormData, path, idx, -1), 
    },
  );

  const onMoveItemDown = (path: string, idx: number) => () => stateMachineService.send(
    FORM_STATE_CONFIG.FORM_STATE_ARRAY_EVENTS.MOVE_ITEM_DOWN,
    { 
      updateArrayFN: (contextFormData) => moveListItem(contextFormData, path, idx, 1), 
    },
  );

  const onDeleteItem = (path: string, idx: number) => () => stateMachineService.send(
    FORM_STATE_CONFIG.FORM_STATE_ARRAY_EVENTS.DELETE_ITEM,
    { 
      updateArrayFN: (contextFormData) => removeListItem(contextFormData, path, idx), 
    },
  );

  const onAddItem = (path: string, defaultValue: any) => () => stateMachineService.send(
    FORM_STATE_CONFIG.FORM_STATE_ARRAY_EVENTS.ADD_ITEM,
    { 
      updateArrayFN: (contextFormData) => addListItem(contextFormData, path, defaultValue || ''), 
    },
  );

  const onAddNewProperty = (path: string, defaultValue: any) => () => stateMachineService.send(
    FORM_STATE_CONFIG.FORM_STATE_ARRAY_EVENTS.ADD_NEW_PROPERTY,
    { 
      updateArrayFN: (contextFormData) => updateFormData(contextFormData, generate(), defaultValue || ''), 
    },
  );

  const onRemoveProperty = (path: string) => () => stateMachineService.send(
    FORM_STATE_CONFIG.FORM_STATE_ARRAY_EVENTS.REMOVE_PROPERTY,
    { 
      updateArrayFN: (contextFormData) => removeValueFromSpec(contextFormData, path), 
    },
  );

  const onUpdateKeyProperty = (path: string) => (givenValue: any, givenUIValue: any, forceDeleteUIData = false) => {
    if (!isEmptyValues(givenUIValue) && !isEmptyValues(givenValue)) {
      stateMachineService.send(
        FORM_STATE_CONFIG.FORM_STATE_ARRAY_EVENTS.UPDATE_NEW_PROPERTY,
        { 
          updateArrayFN: (contextFormData) => updateKeyFromSpec(contextFormData, path, givenValue),
        },
      );
    }
  };

  const onFormValuesChange = (field: any) => (givenValue: any, givenUIValue: any, forceDeleteUIData = false) => {
    /**
     * Todo: if adds includes data then add that data to form data based on its path and disable add data
     *       - On uncheck remove the adds data
     *       - It should be computed at the end and not on click
     */
    stateMachineService.send(
      FORM_STATE_CONFIG.FORM_STATE_EVENTS.UPDATE, 
      { 
        field,
        givenValue,
        givenUIValue,
        forceDeleteUIData,
      },
    );
  };

  const onXHRSchemaEvent = (
    givenField: string) => (xhrDef: { [x: string]: any; url?: any; method?: any; payload?: any; }, xhrEvent: any,
  ) => {
    const { url, method, payload } = xhrDef;
    const mapDef = Object.keys(xhrDef).find((t) => t.includes('map:'));
    const findMapDef = xhrDef[mapDef];
    const field = givenField.split('.').map((gs: any, gsi: number) => (gsi > 0 ? `properties.${gs}` : gs)).join('.');
    set(xhrSchema, `properties.${givenField}.${xhrEvent}.xhrProgress`, true);
    setLoadingState({ ...loadingState, [givenField]: true });
    return executeXHRCall({
      url,
      method,
      payload,
      onSuccess: (xhrData: any[]) => {
        const enums = xhrData.map((xh: any) => get(xh, findMapDef));
        set(
          schema, 
          `properties.${field}.${mapDef.replace('map:', '')}`,
          enums,
        );
        set(xhrSchema, `properties.${givenField}.${xhrEvent}.xhrComplete`, true);
        set(xhrSchema, `properties.${givenField}.${xhrEvent}.xhrProgress`, false);
        setLoadingState({ ...loadingState, [givenField]: false });
      },
    });
  };

  const onFormSubmit = (callback?: () => any) => {
    if (
      xhrSchema 
      && has(xhrSchema, 'ui:page.onsubmit.xhr:datasource.url')
      && has(xhrSchema, 'ui:page.onsubmit.xhr:datasource.method')
      && has(xhrSchema, 'ui:page.onsubmit.xhr:datasource.map:results')
      && has(xhrSchema, 'ui:page.onsubmit.xhr:datasource.map:payload')
    ) {
      const { url, method } = xhrSchema['ui:page'].onsubmit['xhr:datasource'];
      const payload = setNestedPayload({
        payloadData: xhrSchema['ui:page'].onsubmit['xhr:datasource']['map:payload'],
        formData,
        schemaProps: schema.properties,
      });
      return executeXHRCall({
        type: 'onsubmit',
        url,
        method,
        payload,
        onSuccess: (xhrData: any[]) => {
          const xhrDt = Array.isArray(xhrData) ? xhrData[0] : xhrData;
          const mappedResults = xhrSchema['ui:page'].onsubmit['xhr:datasource']['map:results'];
          const resultsMappingInfo = mappedResults.includes('#/') 
            ? getDefinitionsValue(xhrSchema, mappedResults)
            : mappedResults;
          mapData(
            resultsMappingInfo,
            xhrDt,
            formData,
            uiData,
            uiSchema,
            interceptors,
            schema,
            onChange,
            onError,
            (d) => console.log(d), // setData
          );
          return onSubmit(
            { formData: xhrDt, uiData, uiSchema, validation }, 
            () => callback && callback(),
          );
        },
      });
    }
    return onSubmit(
      { formData, uiData, uiSchema, validation }, 
      () => callback && callback(),
    );
  };

  const handleKeyEnter = (e: { keyCode: number; }) => {
    if (e.keyCode === 13 && submitOnEnter) {
      onFormSubmit();
    }
  };

  return {
    onMoveItemUp,
    onMoveItemDown,
    onDeleteItem,
    onAddItem,
    onAddNewProperty,
    onRemoveProperty,
    onUpdateKeyProperty,
    onFormValuesChange,
    onXHRSchemaEvent,
    onFormSubmit,
    handleKeyEnter,
  };
};

export default useFormEvents;
