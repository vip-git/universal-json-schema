/** *
 * Todo:
 * All arrray guards should be refactored to accomodate dynamic creation of keys
 */
const GUARDS = {
  isUpdatedField: (field: string) => (context, event, xstate) => {
    const defaultField = event.field === '' ? 'default' : event.field;
    const arrayField = defaultField.replace(/[(1-9)]/g, '').replace('[]', '').replace(/^(.*?)\./g, '');
    const matchField = defaultField.match(/[(1-9)]/g) ? arrayField === field : field === defaultField;
    // (
    //   Object.keys(xstate.state.value).includes(defaultField) 
    //     ? matchField : defaultField.includes(arrayField)
    // )
    return true;
  },
  isUpdatedErrorField: (field: string) => (context, event) => {
    const givenField = event.dataPath.replace('.', '');
    const hasMissingProp = givenField === '' 
      ? event.params.missingProperty 
      : `${givenField.replace(/[(0-9)]/g, 0)}.${event.params.missingProperty}`;
    const errorField = event?.params?.missingProperty ? hasMissingProp : givenField;
    return field === errorField;
  },
};

export default GUARDS;
