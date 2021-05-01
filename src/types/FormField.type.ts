// Common
import { SchemaProps } from './shared/SchemaProps.type';
import { MaterialUIProps } from './shared/MaterialuiProps.type';

export type FormFieldProps = SchemaProps & MaterialUIProps & {
    dynamicKeyField?: string;
    path?: string;
    prefixId?: string;
    id?: string;
    [key: string]: string | Object | Function; // Custom Props
};
