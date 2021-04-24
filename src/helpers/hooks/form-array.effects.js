const formArray = () => {
  const onMoveItemUp = (path, idx) => () =>
    setData(
      moveListItem(data, path, idx, -1),
      uiData,
      uiSchema,
      schema,
      onChange,
      onError
    );

  const onMoveItemDown = (path, idx) => () =>
    setData(
      moveListItem(data, path, idx, 1),
      uiData,
      uiSchema,
      schema,
      onChange,
      onError
    );

  const onDeleteItem = (path, idx) => () =>
    setData(
      removeListItem(data, path, idx),
      uiData,
      uiSchema,
      schema,
      onChange,
      onError
    );

  const onAddItem = (path, defaultValue) => () =>
    setData(
      addListItem(data, path, defaultValue || ''),
      uiData,
      uiSchema,
      schema,
      onChange,
      onError
    );

  const onAddNewProperty = (path, defaultValue) => () =>
    setData(
      updateFormData(data, generate(), defaultValue || ''),
      uiData,
      uiSchema,
      schema,
      onChange,
      onError
    );

  const onRemoveProperty = (path) => () =>
    setData(
      removeValueFromSpec(data, path),
      uiData,
      uiSchema,
      schema,
      onChange,
      onError
    );

  const onUpdateKeyProperty = (path) => (
    givenValue,
    givenUIValue,
    forceDeleteUIData = false
  ) => {
    const givenFormData = updateKeyFromSpec(data, path, givenValue);
    const givenUIData =
      givenUIValue && updateKeyFromSpec(uiData, path, givenUIValue);
    setData(
      givenFormData,
      !isEqual(givenValue, givenUIValue) ||
        isEmptyValues(givenUIValue) ||
        forceDeleteUIData
        ? givenUIData
        : uiData,
      uiSchema,
      schema,
      onChange,
      onError
    );
  };

  return {
    onMoveItemUp,
    onMoveItemDown,
    onDeleteItem,
    onAddItem,
    onAddNewProperty,
    onRemoveProperty,
    onUpdateKeyProperty,
  };
};
