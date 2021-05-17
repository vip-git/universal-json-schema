const GUARDS = {
  isUpdatedField: (field: string) => (context, event, xstate) => (
    Object.keys(xstate.state.value).includes(event.field) 
      ? field === event.field : event.field.includes(field)
  ),  
  isUpdatedErrorField: (field: string) => (context, event, xstate) => {
    const givenField = event.dataPath.replace('.', '');
    if (event.params && event.params.missingProperty === field) return true;
    return (
      Object.keys(xstate.state.value).includes(givenField) 
        ? field === givenField : givenField.includes(field)
    );
  },
};

export default GUARDS;
