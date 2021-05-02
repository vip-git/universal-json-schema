// Internal
import { isEnum } from '@react-jsonschema-form-utils/enum-utils';

const Utils = {
  callFunction: (Object: any, Key: string | number, Params?: any) => Object 
    && Key 
    && typeof Object[Key] === 'function' 
    && Object[Key](Params),
  callFunctionIfExists: (
    Object: any, 
    Key: string | number, 
    Params?: any,
  ) => Utils.callFunction(Object, Key, Params) || null,
  getFieldSetRenderComponent: ({
    schema,
    data,
  }) => (!Array.isArray(schema.items) && !schema.uniqueItems && 'hasRecursiveFields') 
    || (Array.isArray(schema.items) && data && 'hasItemsArray')
    || (!Array.isArray(schema.items) && schema.uniqueItems && schema.items && isEnum(schema.items) && 'hasEnumValues'),
  doesSchemaHaveAdditionalItems: (schema) => (schema.additionalItems && 'hasAdditionalItems'),
};

export default Utils;
