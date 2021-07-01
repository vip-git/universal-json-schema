// Imports
import getValidationResult from './get-validation-result';
import isFormSchemaStateValid from '../state-machine/helpers/is-form-schema-state-valid';
import getDefinitionSchemaFromRef from '../get-definition-schema';

export { default } from './get-validation-result';

/**
   * @description
   * Gets Schema and form data to render/parse for current view.
   * 
   * @param { currentSchema, currentData, activeStep } 
   * @returns { Schema, data }
   */
const getSchemaAndFormData = ({
  isStepperUI,
  currentSchema: givenSchema,
  currentData: givenData,
  currentUISchema,
  activeStep,
}) => {
  const currentSchema = JSON.parse(JSON.stringify(givenSchema));
  const currentData = JSON.parse(JSON.stringify(givenData));
  if (currentSchema.properties) {
    const stepName = Object.keys(currentSchema.properties)[activeStep];
    const translatedSchema = getDefinitionSchemaFromRef(
      currentSchema.definitions, 
      currentSchema.properties[stepName], 
      currentData[stepName],
    );
    const schema = isStepperUI(currentUISchema) 
      ? {
        ...translatedSchema,
      }
      : currentSchema;
    const data = isStepperUI(currentUISchema) ? currentData[stepName] : currentData;
    return {
      schema,
      data,
    };
  }

  return {
    schema: currentSchema,
    data: currentData,
  };
};
  
const getValidationErrors = (validation) => Object.keys(validation).map(
  (vp) => (Array.isArray(validation[vp]) ? validation[vp].length : getValidationErrors(validation[vp],
  )));

export const hasSchemaErrors = ({
  currentSchema,
  currentUISchema,
  currentData,
  validations,
  activeStep,
  stateMachineService,
  state,
  buttonDisabled,
  isStepperUI,
}) => {
  const validation = getValidationResult(
    currentSchema, 
    currentUISchema, 
    currentData, 
    validations,
  );

  const isError = getValidationErrors(validation).flat(1).filter(
    (v) => (Array.isArray(v) ? v.length !== 0 : v !== 0),
  ).length > 0;

  const { schema, data } = getSchemaAndFormData({
    currentData,
    currentSchema,
    currentUISchema,
    activeStep,
    isStepperUI,
  });

  const { schemaErrors, transformedSchema } = isFormSchemaStateValid({
    stateMachineService,
    schema,
    uiSchema: currentUISchema,
    validation,
    data,
    onError: state?.context?.effects?.onError,
    buttonDisabled,
  });

  return {
    validation,
    schemaErrors,
    transformedSchema,
    isError,
  };
};
