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
}) => {
  if (get(uiSchema, 'ui:page.props.ui:schemaErrors') 
  || !has(uiSchema, 'ui:page.props.ui:schemaErrors')) {
    try {
      const transformedSchema = transformSchema(schema);
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
        stateMachineService.send(FORM_STATE_CONFIG.FORM_STATE_ERROR_EVENTS.ERROR, externalValidations);
        return {
          schemaErrors: externalValidations,
          transformedSchema,
        };
      }

      if (!externalValidations && validate.errors && !buttonDisabled) {
        validate.errors.forEach((err) => {
          stateMachineService.send(FORM_STATE_CONFIG.FORM_STATE_ERROR_EVENTS.ERROR, err);
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
      // console.log('err', err);
    }
  }
  
  return {
    schemaErrors: [],
    transformedSchema: transformSchema(schema),
  };
};

export default isFormSchemaStateValid;
