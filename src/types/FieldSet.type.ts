// Shared
import { SchemaProps } from 'shared/SchemaProps.type';
import { MaterialUIProps } from './shared/MaterialuiProps.type';

export type FieldSetProps = SchemaProps & MaterialUIProps & {
    path: string;
    dynamicKeyField: string;
    hideTitle: boolean;
    noTitle?: boolean;
    validation?: string;
};
