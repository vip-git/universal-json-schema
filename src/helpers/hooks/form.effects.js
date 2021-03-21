// Internal
import formArrayEffects from './form-array.effects';
import formStepsEffects from './form-steps.effects';

// Global State
let data = {};
let uiData = {};
let validSchema = {};

const FormEffects = () => {
  const array = formArrayEffects();
  const steps = formStepsEffects();
  
  const onFormValuesChange = (field) => (
    givenValue,
    givenUIValue,
    forceDeleteUIData = false
  ) => {
    /**
     * Todo: if adds includes data then add that data to form data based on its path and disable add data
     *       - On uncheck remove the adds data
     *       - It should be computed at the end and not on click
     */
    // console.log('givenValue is', givenValue, givenUIValue, 'field is', field);
    const newFormData = updateFormData(data, field, givenValue);
    const newUIData =
      isEmptyValues(givenUIValue) || forceDeleteUIData
        ? removeValueFromSpec(uiData, field)
        : updateFormData(uiData, field, givenUIValue);
    const finalUIData =
      !isEqual(givenValue, givenUIValue) ||
      isEmptyValues(givenUIValue) ||
      forceDeleteUIData
        ? newUIData
        : uiData;
    setData(newFormData, finalUIData, uiSchema, schema, onChange, onError);
  };

  const onXHRSchemaEvent = (field) => (xhrDef, xhrEvent) => {
    const { url, method, payload } = xhrDef;
    const mapDef = Object.keys(xhrDef).find((t) => t.includes('map:'));
    const findMapDef = xhrDef[mapDef];
    set(xhrSchema, `properties.${field}.${xhrEvent}.xhrProgress`, true);
    setLoadingState({ ...loadingState, [field]: true });
    executeXHRCall({
      url,
      method,
      payload,
      onSuccess: (xhrData) => {
        const enums = xhrData.map((xh) => get(xh, findMapDef));
        set(schema, `properties.${field}.${mapDef.replace('map:', '')}`, enums);
        set(xhrSchema, `properties.${field}.${xhrEvent}.xhrComplete`, true);
        set(xhrSchema, `properties.${field}.${xhrEvent}.xhrProgress`, false);
        setLoadingState({ ...loadingState, [field]: false });
      },
    });
  };

  const onFormSubmit = (callback) => {
    if (
      xhrSchema &&
      has(xhrSchema, 'ui:page.onsubmit.xhr:datasource.url') &&
      has(xhrSchema, 'ui:page.onsubmit.xhr:datasource.method') &&
      has(xhrSchema, 'ui:page.onsubmit.xhr:datasource.map:results') &&
      has(xhrSchema, 'ui:page.onsubmit.xhr:datasource.map:payload')
    ) {
      const { url, method } = xhrSchema['ui:page'].onsubmit['xhr:datasource'];
      const payload = setNestedPayload({
        payloadData:
          xhrSchema['ui:page'].onsubmit['xhr:datasource']['map:payload'],
        formData: data,
        schemaProps: schema.properties,
      });
      return executeXHRCall({
        type: 'onsubmit',
        url,
        method,
        payload,
        onSuccess: (xhrData) => {
          const xhrDt = Array.isArray(xhrData) ? xhrData[0] : xhrData;
          const mappedResults =
            xhrSchema['ui:page'].onsubmit['xhr:datasource']['map:results'];
          const resultsMappingInfo = mappedResults.includes('#/')
            ? getDefinitionsValue(xhrSchema, mappedResults)
            : mappedResults;
          mapData(
            resultsMappingInfo,
            xhrDt,
            data,
            uiData,
            uiSchema,
            interceptors,
            schema,
            onChange,
            onError,
            setData
          );
          return onSubmit(
            { formData: xhrDt, uiData, uiSchema, validation },
            () => callback && callback()
          );
        },
      });
    }
    return onSubmit(
      { formData: data, uiData, uiSchema, validation },
      () => callback && callback()
    );
  };

  const onFormReset = (path, callback) => {
    console.log('path is', path);
    return (
      onStepReset &&
      onStepReset(
        { formData: data, uiData, uiSchema, validation },
        () => callback && callback()
      )
    );
  };

  const handleKeyEnter = (e) => {
    if (e.keyCode === 13 && submitOnEnter) {
      onFormSubmit();
    }
  };

  return {
    onFormValuesChange,
    onXHRSchemaEvent,
    onFormReset,
    handleKeyEnter,
    onFormSubmit,
    array,
    steps,
  };
};
