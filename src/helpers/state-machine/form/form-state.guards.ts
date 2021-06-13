import {
  getHashCodeFromXHRDef,
} from './hooks';

const GUARDS = {
  isUpdatedField: (field: string) => (context, event, xstate) => {
    const hashRef = getHashCodeFromXHRDef({
      eventName: 'onload',
      fieldPath: 'ui:page',
      xhrSchema: context.xhrSchema,
    });
    return !(context.xhrProgress && hashRef && context.xhrProgress[hashRef]);
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
