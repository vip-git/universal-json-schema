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
import getHashCodeFromXHRDef from '../../helpers/get-hashcode-from-xhr-def';

// Config
import FORM_STATE_CONFIG from '../config';
  
const useFormEvents = ({
  stateMachineService,
  validation,
  formData,
  schema,
  uiData, 
  uiSchema,
  xhrSchema,
  interceptors,
  submitOnEnter,
  onSubmit,
}) => {
  const onMoveItemUp = (path: string, idx: number) => () => stateMachineService.send(
    FORM_STATE_CONFIG.FORM_STATE_ARRAY_EVENTS.MOVE_ITEM_UP,
    { 
      updateArrayFN: (context) => moveListItem(context.formData, path, idx, -1), 
    },
  );

  const onMoveItemDown = (path: string, idx: number) => () => stateMachineService.send(
    FORM_STATE_CONFIG.FORM_STATE_ARRAY_EVENTS.MOVE_ITEM_DOWN,
    { 
      updateArrayFN: (context) => moveListItem(context.formData, path, idx, 1), 
    },
  );

  const onDeleteItem = (path: string, idx: number) => () => stateMachineService.send(
    FORM_STATE_CONFIG.FORM_STATE_ARRAY_EVENTS.DELETE_ITEM,
    { 
      updateArrayFN: (context) => removeListItem(context.formData, path, idx), 
    },
  );

  const onAddItem = (path: string, defaultValue: any) => () => stateMachineService.send(
    FORM_STATE_CONFIG.FORM_STATE_ARRAY_EVENTS.ADD_ITEM,
    { 
      updateArrayFN: (context) => addListItem(context.formData, path, defaultValue || ''), 
    },
  );

  const onAddNewProperty = (path: string, defaultValue: any) => () => stateMachineService.send(
    FORM_STATE_CONFIG.FORM_STATE_ARRAY_EVENTS.ADD_NEW_PROPERTY,
    { 
      updateArrayFN: (context) => updateFormData(context.formData, generate(), defaultValue || ''), 
    },
  );

  const onRemoveProperty = (path: string) => () => stateMachineService.send(
    FORM_STATE_CONFIG.FORM_STATE_ARRAY_EVENTS.REMOVE_PROPERTY,
    { 
      updateArrayFN: (context) => removeValueFromSpec(context.formData, path), 
    },
  );

  const onUpdateKeyProperty = (path: string) => (givenValue: any, givenUIValue: any, forceDeleteUIData = false) => {
    if (!isEmptyValues(givenUIValue) && !isEmptyValues(givenValue)) {
      stateMachineService.send(
        FORM_STATE_CONFIG.FORM_STATE_ARRAY_EVENTS.UPDATE_NEW_PROPERTY,
        { 
          updateArrayFN: (context) => updateKeyFromSpec(context.formData, path, givenValue),
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
    const hashRef = getHashCodeFromXHRDef({
      eventName: xhrEvent,
      fieldPath: `properties.${givenField}`,
      xhrSchema,
    });
    stateMachineService.send(
      FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.UPDATE_XHR_PROGRESS, 
      {
        status: true,
        hashRef,
      },
    );
    return executeXHRCall({
      url,
      method,
      payload,
      onFailure: () => stateMachineService.send(
        FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.ERROR_XHR_PROGRESS, 
        {
          status: false,
          hashRef,
        },
      ),
      onSuccess: (xhrData: any[]) => {
        const enums = xhrData.map((xh: any) => get(xh, findMapDef));
        const formSchema = JSON.parse(JSON.stringify(schema));
        set(
          formSchema, 
          `properties.${field}.${mapDef.replace('map:', '')}`,
          enums,
        );
        stateMachineService.send(
          FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.UPDATE_FORM_ON_XHR_COMPLETE,
          {
            formSchema, 
            hashRef,
          },
        );
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
      const hashRef = getHashCodeFromXHRDef({
        eventName: 'onsubmit',
        fieldPath: 'ui:page',
        xhrSchema,
      });
      stateMachineService.send(
        FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.UPDATE_XHR_PROGRESS, 
        {
          status: true,
          hashRef,
        },
      );
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
        onFailure: () => stateMachineService.send(
          FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.ERROR_XHR_PROGRESS, 
          {
            status: false,
            hashRef,
          },
        ),
        onSuccess: (xhrData: any[]) => {
          const xhrDt = Array.isArray(xhrData) ? xhrData[0] : xhrData;
          const mappedResults = xhrSchema['ui:page'].onsubmit['xhr:datasource']['map:results'];
          const resultsMappingInfo = mappedResults.includes('#/') 
            ? getDefinitionsValue(xhrSchema, mappedResults)
            : mappedResults;
          const setData = (
            returnData,
            returnUIData,
          ) => {
            stateMachineService.send(
              FORM_STATE_CONFIG.FORM_STATE_XHR_EVENTS.UPDATE_FORM_ON_XHR_COMPLETE,
              {
                formData: returnData,
                uiData: returnUIData,
                hashRef,
              },
            );
          };  
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

  const onTabChange = (event, newValue) => stateMachineService.send(
    FORM_STATE_CONFIG.FORM_STATE_TAB_EVENTS.UPDATE_TAB_INDEX, 
    { 
      tabIndex: newValue,
    },
  );

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
    onTabChange,
  };
};

export default useFormEvents;
