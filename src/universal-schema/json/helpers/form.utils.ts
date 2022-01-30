// Internal
import getschemaproperties from './schema-props';

export const FormUtils = () => {
    const getUISchemaType = (uiSchema) => {
        return uiSchema['ui:page'] && uiSchema['ui:page']['ui:layout'] || 'Default';
    };

    const getSchemaAdditionalPropertiesLength = (schema) => {
        return Object.keys(schema).indexOf('additionalProperties');
    }

    const getSchemaPropertiesLength = (schema) => {
        return Object.keys(schema).indexOf('additionalProperties');
    }

    return {
        getUISchemaType,
        getSchemaAdditionalPropertiesLength,
        getSchemaPropertiesLength,
        getschemaproperties
    };
};