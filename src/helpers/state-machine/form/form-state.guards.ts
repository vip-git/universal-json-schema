// Library
import { get } from 'lodash';

// Helpers
import {
  getHashCodeFromXHRDef,
} from './hooks';
import { hasSchemaErrors } from '../../validation';
import updateFormData from '../../update-form-data';
import removeEmptyObjects from '../../remove-empty-values';

const GUARDS = {
  isUpdatedField: (field: string) => (context, event, xstate) => {
    let isSchemaValid = true;
    const hashRef = getHashCodeFromXHRDef({
      eventName: 'onload',
      fieldPath: 'ui:page',
      xhrSchema: context.xhrSchema,
    });
    try {
      const currentData = removeEmptyObjects(
        updateFormData(
          context.formData, 
          event.field, 
          event.givenValue,
        ), 
        context.parsedFormSchema,
      );
      const {
        schemaErrors,
        isError,
      } = hasSchemaErrors({
        currentSchema: context.formSchema,
        currentUISchema: context.uiSchema,
        currentData,
        validations: context.validations,
        activeStep: context.activeStep,
        stateMachineService: { 
          send: () => {
            // console.log(er);
          }, 
        },
        state: { context },
        buttonDisabled: false,
        isStepperUI: (currentUISchema) => get(
          currentUISchema, 'ui:page.ui:layout',
        ) === 'steps',
      });
      isSchemaValid = !schemaErrors && !isError;
    }
    catch (er) {
      // console.log(er);
    }
    
    return !(context.xhrProgress && hashRef && context.xhrProgress[hashRef]) && isSchemaValid;
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
