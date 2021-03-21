const formSteps = () => {
  const onFormNext = (path, callback) => {
    if (
      xhrSchema &&
      has(xhrSchema, `properties.${path}.onsubmit.xhr:datasource.url`) &&
      has(xhrSchema, `properties.${path}.onsubmit.xhr:datasource.method`) &&
      has(
        xhrSchema,
        `properties.${path}.onsubmit.xhr:datasource.map:results`
      ) &&
      has(xhrSchema, `properties.${path}.onsubmit.xhr:datasource.map:payload`)
    ) {
      const { url, method } = xhrSchema.properties[path].onsubmit[
        'xhr:datasource'
      ];
      const payloadData =
        xhrSchema.properties[path].onsubmit['xhr:datasource']['map:payload'];
      const schemaProps = schema.properties;
      const schemaDefs = schema.definitions;
      const getPayloadFromTemplateString = (givenData, pKey) => {
        const payloadKey = pKey.replace('${formData.', '').replace('}', '');
        return pKey.replace('${', '').replace('}', '') === 'formData'
          ? givenData
          : get(givenData, payloadKey);
      };
      const payload = payloadData.includes('${formData')
        ? getPayloadFromTemplateString(data, payloadData) // Todo: add map results functionality as optional
        : setNestedPayload({
            // Todo: make map resulsts functionality optional
            payloadData,
            formData: data,
            schemaProps,
            schemaDefs,
          });
      return executeXHRCall({
        type: 'onNext',
        url,
        method,
        payload,
        onSuccess: (xhrData) => {
          const xhrDt = Array.isArray(xhrData) ? xhrData[0] : xhrData;
          const mappedResults =
            xhrSchema.properties[path].onsubmit['xhr:datasource'][
              'map:results'
            ];
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
    return (
      onStepNext &&
      onStepNext(
        { formData: data, uiData, uiSchema, validation },
        () => callback && callback()
      )
    );
  };

  const onFormBack = (path, callback) => {
    console.log('path is', path);
    return (
      onStepBack &&
      onStepBack(
        { formData: data, uiData, uiSchema, validation },
        () => callback && callback()
      )
    );
  };

  const onFormSkip = (path, callback) => {
    console.log('path is', path);
    return (
      onStepSkip &&
      onStepSkip(
        { formData: data, uiData, uiSchema, validation },
        () => callback && callback()
      )
    );
  };

  return {
    onFormNext,
    onFormBack,
    onFormSkip,
  };
};
