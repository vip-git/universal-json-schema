// Common
import { SchemaProps } from './shared/SchemaProps.type';
import { MaterialUIProps } from './shared/MaterialuiProps.type';

export type FieldSetObjectProps = SchemaProps & MaterialUIProps & {
    id: string;
    idxKey: string;
    path: string;
    validation: any; 
    isTabContent: boolean;
    tabKey: string;
};
