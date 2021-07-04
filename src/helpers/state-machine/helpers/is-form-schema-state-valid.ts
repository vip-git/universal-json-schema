// Library
import Ajv from 'ajv';
import { has, get } from 'lodash';

// Config
import FORM_STATE_CONFIG from '../form/config';

// Helpers
import transformSchema from '../../transform-schema';
import isFormInValid from '../../validation/is-form-validated';
import Utils from '../../utils';

const isFormSchemaStateValid = ({
  schema,
  uiSchema,
  data,
  onError,
  validation,
  buttonDisabled,
  stateMachineService,
  formSchemaXHR = {},
  isStepper,
}) => {
  if (get(uiSchema, 'ui:page.props.ui:schemaErrors') 
  || !has(uiSchema, 'ui:page.props.ui:schemaErrors')) {
    try {
      const transformedSchema = transformSchema({
        ...schema,
        ...formSchemaXHR,
      });
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
        if (stateMachineService && typeof stateMachineService.send === 'function') {
          stateMachineService.send(FORM_STATE_CONFIG.FORM_STATE_ERROR_EVENTS.ERROR, {
            hasError: externalValidations,
            validation,
          });
        }
        return {
          schemaErrors: externalValidations,
          transformedSchema,
        };
      }

      if (!externalValidations && validate.errors && !buttonDisabled) {
        validate.errors.forEach((err) => {
          if (stateMachineService && typeof stateMachineService.send === 'function') {
            stateMachineService.send(FORM_STATE_CONFIG.FORM_STATE_ERROR_EVENTS.ERROR, {
              hasError: err,
              validation,
            });
          }
        });
        return {
          schemaErrors: validate.errors,
          transformedSchema,
        };
      }

      return {
        schemaErrors: validate.errors,
        transformedSchema,
      };
    }
    catch (err) {
      if (!isStepper) {
        const transformedSchema = transformSchema({
          ...schema,
          ...formSchemaXHR,
        });
        return {
          schemaErrors: [{
            'rule': 'schemaError',
            'title': 'Invalid Form Schema',
            'message': String(err),
          }],
          transformedSchema,
        };
      }
    }
  }
  
  return {
    schemaErrors: [],
    transformedSchema: transformSchema(schema),
  };
};

export default isFormSchemaStateValid;
