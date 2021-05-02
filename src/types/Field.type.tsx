// shared
import { FormEvents } from './shared/FormEvents.type';

export type FieldProps = FormEvents & {
    path: string;
    prefixId: string;
    schema: any;
    data: any;
    uiSchema: any; 
    xhrSchema?: any;
    validation?: any;
    dependencies?: any;
    dynamicKeyField?: string;
};
