import { FormEvents } from './FormEvents.type';

export interface SchemaProps extends FormEvents {
    schema?: any;
    data?: any;
    uiData?: any;
    uiSchema?: any;
    xhrSchema?: any;
    definitions?: any;
    required?: Array<string>;
}
