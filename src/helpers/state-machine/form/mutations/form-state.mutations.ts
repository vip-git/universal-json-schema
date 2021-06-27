// Library
import { assign, EventObject } from 'xstate';
import { isEqual, omit } from 'lodash';

// Helpers
import removeEmptyObjects, { isEmptyValues } from '../../../remove-empty-values';
import updateFormData, { setUISchemaData } from '../../../update-form-data'; 
import { flattenSchemaPropFromDefinitions } from '../../../get-definition-schema';

// Types
import { FormContext } from '../../types/form-state-machine.type';

interface EventPayload {
    field: string;
    givenValue: string | object | Array<any>;
    givenUIValue: string | object | Array<any>;
    formData: any;
    uiData: any;
    forceDeleteUIData: boolean;
    effects: any;
    uiSchema?: any;
    formSchema?: any;
    schema?: any;
}

const HELPERS = {
  getValidUIData: (context: FormContext, event: EventObject & EventPayload) => {
    const { givenValue, givenUIValue, field, forceDeleteUIData } = event;
    const newUIData = isEmptyValues(givenUIValue) || forceDeleteUIData
      ? omit(context.uiData, field) 
      : updateFormData(context.uiData, field, givenUIValue);
    return (!isEqual(givenValue, givenUIValue) 
            || isEmptyValues(givenUIValue) 
            || forceDeleteUIData) ? newUIData : {
        ...context.uiData,
      };
  },
};

const FormMutations = {
  updateData: assign({
    formData: (context: FormContext, event: EventPayload) => removeEmptyObjects(
      updateFormData(
        context.formData, 
        event.field, 
        event.givenValue,
      ), 
      context.parsedFormSchema,
    ),
    lastField: (context: FormContext, event: EventObject & EventPayload) => event.field,
    formSchema: (context: FormContext, event: EventObject & EventPayload) => context.formSchema,
    parsedFormSchema: (context: FormContext, event: EventObject & EventPayload) => (context.formSchema.definitions 
      ? flattenSchemaPropFromDefinitions(context.formSchema, context.formData)
      : context.formSchema
    ),
    uiData: (context: FormContext, event: EventObject & EventPayload) => HELPERS.getValidUIData(context, event),
    uiSchema: (context: FormContext, event: EventObject & EventPayload) => setUISchemaData(
      HELPERS.getValidUIData(context, event),
      context.uiSchema,
    ),
    effects: (context: FormContext, event: EventObject & EventPayload) => ({
      ...context.effects,
      ...event.effects,
    }),
    xhrProgress: (context: FormContext, event: EventObject & { status: boolean; hashRef: string }) => ({
      ...context.xhrProgress,
    }),
  }),
  updateXHRData: assign({
    formSchemaXHR: (context: FormContext, event: EventObject & EventPayload) => (event.formSchema ? ({
      ...context.formSchemaXHR,
      ...event.formSchema,
    }) : ({ ...context.formSchemaXHR })),
    formData: (context: FormContext, event: EventObject & EventPayload) => (event.formData ? ({
      ...context.formData,
      ...event.formData,
    }) : ({ ...context.formData })),
    uiData: (context: FormContext, event: EventObject & EventPayload) => (event.uiData ? ({
      ...context.uiData,
      ...event.uiData,
    }) : ({ ...context.uiData })),
    xhrProgress: (context: FormContext, event: EventObject & { status: boolean; hashRef: string }) => ({
      ...context.xhrProgress,
      [event.hashRef]: false,
    }),
  }),
  updateXHRProgress: assign({
    xhrProgress: (context: FormContext, event: EventObject & { status: boolean; hashRef: string }) => ({
      ...context.xhrProgress,
      [event.hashRef]: event.status,
    }),
  }),
  updateErrorXHRProgress: assign({
    xhrProgress: (context: FormContext, event: EventObject & { status: boolean; hashRef: string }) => ({
      ...context.xhrProgress,
      [event.hashRef]: event.status,
    }),
    hasXHRError: (context: FormContext, event: EventObject) => true,
    validation: (context: FormContext, event: EventObject & { callback: Function }) => (
      context?.xhrSchema['ui:errors']?.offline ? {
        xhr: [
          {
            'rule': 'offline',
            'title': context?.xhrSchema['ui:errors']?.offline?.title,
            'message': context?.xhrSchema['ui:errors']?.offline?.message,
            'callback': event.callback,
          },
        ],
      } : {}
    ),
  }),
  updateArrayData: assign({
    formData: (context: FormContext, event: EventObject & { 
      updateArrayFN: Function;
    }) => ({
      ...event.updateArrayFN(context),
    }),
  }),
  updateActiveStep: assign({
    activeStep: (context: FormContext, event: EventObject & { stepName: string }) => Object.keys(
      context.formSchema.properties,
    ).indexOf(event.stepName),
  }),
  updateErrorData: assign({
    hasError: (context: FormContext, event: EventObject & { hasError: any }) => context.hasXHRError || event.hasError,
    validation: (context: FormContext, event: EventObject & { validation: any }) => (
      context.hasXHRError ? context.validation : event.validation
    ),
  }),
  updateTabIndex: assign({
    uiSchema: (context: FormContext, event: EventObject & { tabIndex: number }) => ({
      ...context.uiSchema,
      'ui:page': {
        ...context.uiSchema['ui:page'],
        tabs: context.uiSchema['ui:page'].tabs ? {
          ...context.uiSchema['ui:page'].tabs,
          props: context.uiSchema['ui:page'].tabs.props ? {
            ...context.uiSchema['ui:page'].tabs.props,
            tabIndex: event.tabIndex,
          } : {
            tabIndex: event.tabIndex,
          },
        } : {
          props: {
            tabIndex: event.tabIndex,
          },
        },
      },
    }),
  }),
};

export default FormMutations;
