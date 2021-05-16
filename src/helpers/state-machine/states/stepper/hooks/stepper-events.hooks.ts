// Lodash
import get from 'lodash/get';
import has from 'lodash/has';

// Helpers
import { mapData, setNestedPayload, getDefinitionsValue } from '../../../../transform-schema';
import executeXHRCall from '../../../../execute-xhr-call';

// Config
import { STEPPER_STATE_CONFIG } from '../stepper-state.config';
  
const useStepperEvents = ({
  stateMachineService,
  validation,
  formData,
  schema,
  uiData, 
  uiSchema,
  xhrSchema,
  interceptors,
  onSubmit,
  onChange,
  onError,
  givenOnStepNext,
  givenOnStepReset,
  givenOnStepBack,
  givenOnStepSkip,
}) => {
  const onStepNext = (path: string | number, callback: () => any) => {
    if (
      xhrSchema 
      && has(xhrSchema, `properties.${path}.onsubmit.xhr:datasource.url`)
      && has(xhrSchema, `properties.${path}.onsubmit.xhr:datasource.method`)
      && has(xhrSchema, `properties.${path}.onsubmit.xhr:datasource.map:results`)
      && has(xhrSchema, `properties.${path}.onsubmit.xhr:datasource.map:payload`)
    ) {
      const { url, method } = xhrSchema.properties[path].onsubmit['xhr:datasource'];
      const payloadData = xhrSchema.properties[path].onsubmit['xhr:datasource']['map:payload'];
      const schemaProps = schema.properties;
      const schemaDefs = schema.definitions;
      const getPayloadFromTemplateString = (givenData: {}, pKey: string) => {
        const payloadKey = pKey.replace('${formData.', '').replace('}', '');
        return pKey.replace('${', '').replace('}', '') === 'formData' ? givenData : get(givenData, payloadKey);
      };
      const payload = payloadData.includes('${formData') 
        ? getPayloadFromTemplateString(formData, payloadData) // Todo: add map results functionality as optional
        : setNestedPayload({ // Todo: make map resulsts functionality optional
          payloadData,
          formData,
          schemaProps,
          schemaDefs,
        });
      return executeXHRCall({
        type: 'onNext',
        url,
        method,
        payload,
        onSuccess: (xhrData: any[]) => {
          const xhrDt = Array.isArray(xhrData) ? xhrData[0] : xhrData;
          const mappedResults = xhrSchema.properties[path].onsubmit['xhr:datasource']['map:results'];
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
    return givenOnStepNext && givenOnStepNext(
      { formData, uiData, uiSchema, validation },
      () => callback && callback(),
    );
  };

  const onStepBack = (path: string, callback: () => any) => givenOnStepBack && givenOnStepBack(
    { formData, uiData, uiSchema, validation },
    () => callback && callback(),
  );

  const onStepSkip = (path: string, callback: () => any) => givenOnStepSkip && givenOnStepSkip(
    { formData, uiData, uiSchema, validation },
    () => callback && callback(),
  );

  const onStepReset = (path: string, callback: () => any) => givenOnStepReset && givenOnStepReset(
    { formData, uiData, uiSchema, validation },
    () => callback && callback(),
  );

  return {
    onStepNext,
    onStepBack,
    onStepSkip,
    onStepReset,
  };
};

export default useStepperEvents;
