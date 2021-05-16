// Library
import React from 'react';
import { 
  State, 
} from 'xstate';
import Ajv from 'ajv';
import { get, has } from 'lodash';

// Helpers
import removeEmptyObjects from '../../../../remove-empty-values';
import transformSchema from '../../../../transform-schema';
import isFormInValid from '../../../../validation/is-form-validated';
import Utils from '../../../../utils';
  
// config
import { FORM_STATE_CONFIG } from '../form-state.config';

export type StateMachineInstance = State<Record<string, any>, any, any, {
  value: any;
  context: Record<string, any>;
}>;

interface ExecuteFormActions {
  state: StateMachineInstance;
  stateMachineService: any;
}

/**
 * @description
 * This function acts more like a mini rules engine currenly only 2 rules.
 * 1. To Execute updates when state changes are seen.
 * 2. To Disable submit button when state detects invalid fields.
 * 3. To Enable submit button when state detects all valid fields.
 * 4. To Propagate onChange event on formProps when update is done.
 * @param param0 
 * @returns 
 */
const useFormActions = () => {
  const { 
    FORM_ACTIONS: actions, 
    FORM_STATE_EVENTS, 
    FORM_STATE_ARRAY_EVENTS, 
    FORM_STATE_ERROR_EVENTS,
  } = FORM_STATE_CONFIG;
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const getValidActionToExecute = (
    state: StateMachineInstance,
  ) => {
    const executable = [];

    const PROPAGATE_ON_CHANGE_CONDITION = {
      condition: typeof state.context.effects.onChange,
      equals: 'function',
      callback: () => executable.push(actions.PROPOGATE_ONCHANGE_EVENT),
    };

    const FORM_UPDATE_CONDITION = {
      condition: Object.values({
        ...FORM_STATE_EVENTS,
        ...FORM_STATE_ARRAY_EVENTS,
      }).includes(state.event.type),
      equals: true,
      callback: () => executable.push(actions.DO_FORM_UPDATE),
      nestedCondition: [{ ...PROPAGATE_ON_CHANGE_CONDITION }],
    };

    const ENABLE_FORM_CONDITION = {
      condition: Object.values(state.value).includes(FORM_STATE_ERROR_EVENTS.INVALID),
      equals: false,
      callback: () => executable.push(actions.ENABLE_FORM_SUBMIT),
    };

    const DISABLE_FORM_CONDITION = {
      condition: Object.values(state.value).includes(FORM_STATE_ERROR_EVENTS.INVALID),
      equals: true,
      callback: () => executable.push(actions.DISABLE_FORM_SUBMIT),
    };

    Utils.executeConditions([
      { ...FORM_UPDATE_CONDITION },
      { ...ENABLE_FORM_CONDITION },
      { ...DISABLE_FORM_CONDITION },
    ]);

    return executable;
  };

  const disableButtonOnSchemaErrors = ({
    stateMachineService,
    uiSchema,
    schema,
    validation,
    activeStep,
    data,
    onError,
  }) => {
    if (get(uiSchema, 'ui:page.props.ui:schemaErrors') 
  || !has(uiSchema, 'ui:page.props.ui:schemaErrors')) {
      try {
        const givenSchema = get(uiSchema, 'ui:page.ui:layout') === 'steps' 
          ? JSON.parse(JSON.stringify(schema))
          : schema;
        if (get(uiSchema, 'ui:page.ui:layout') === 'steps') {
          Object.keys(givenSchema.properties).forEach((propName) => {
            givenSchema.properties[propName] = propName === Object.keys(givenSchema.properties)[activeStep] ? {
              ...givenSchema.properties[propName],
            } : {
              ...givenSchema.properties[propName],
              required: [],
            };
          });
        }
        const transformedSchema = transformSchema(givenSchema);
        const ajv = new Ajv();
        const validate = ajv.compile(transformedSchema);
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        validate(data);

        Utils.executeCondition({
          condition: validate.errors && onError && typeof onError,
          equals: 'function',
          callback: () => onError(validate.errors),
        });

        const externalValidations = isFormInValid(validation);
        if (externalValidations && !buttonDisabled) {
          stateMachineService.send('error', externalValidations);
        }

        if (!externalValidations && validate.errors && !buttonDisabled) {
          validate.errors.forEach((err) => {
            stateMachineService.send('error', err);
          });
        }

        return {
          schemaErrors: validate.errors,
          transformedSchema,
        };
      }
      catch (err) {
        // console.log('err', err);
      }
    }

    return {
      schemaErrors: [],
      transformedSchema: transformSchema(schema),
    };
  };

  const executeAction = {
    [actions.DISABLE_FORM_SUBMIT]: () => setButtonDisabled(true),
    [actions.ENABLE_FORM_SUBMIT]: () => setButtonDisabled(false),
    [actions.PROPOGATE_ONCHANGE_EVENT]: ({
      stateMachineService,
      validation,
      activeStep,
      state,
    }) => {
      const {
        formSchema: currentSchema, 
        formData: currentData, 
        uiData: currentUIData, 
        uiSchema: currentUISchema,
      } = state.context;
      const { schemaErrors, transformedSchema } = disableButtonOnSchemaErrors({
        stateMachineService,
        schema: currentSchema,
        uiSchema: currentUISchema,
        validation,
        activeStep,
        data: currentData,
        onError: state.context.effects.onError,
      });
      state.context.effects.onChange({ 
        formData: currentData, 
        uiData: currentUIData,
        uiSchema: currentUISchema, 
        schemaErrors,
        validSchema: transformedSchema,
      });
    },
    [actions.DO_FORM_UPDATE]: ({
      state,
    }) => {
      const {
        formData: currentData, 
        uiData: currentUIData, 
        uiSchema: currentUISchema,
      } = state.context;
      const finalData = removeEmptyObjects(currentData, state.context.formSchema);
      state.context.effects.setFormInfo(
        {
          formData: finalData,
          uiData: currentUIData,
          uiSchema: currentUISchema,
        },
      );
    },
  };

  const executeFormActionsByState = ({
    state,
    stateMachineService,
  }: ExecuteFormActions) => getValidActionToExecute(state).forEach((action) => {
    console.log('executing action', action, 'for state', state);
    executeAction[action]({
      state,
      stateMachineService,
    });
  });

  return {
    executeFormActionsByState,
    buttonDisabled,
  };
};

export default useFormActions;
