// Shared
import { MouseEventHandler } from 'react';
import { SchemaProps } from './shared/SchemaProps.type';
import { MaterialUIProps } from './shared/MaterialuiProps.type';
import { OrderFunction } from './ReoderableFormField.type';

export type FieldSetArrayProps = SchemaProps & MaterialUIProps & {
    startIdx?: number;
    path: string;
    onMoveItemUp?: OrderFunction;
    onMoveItemDown?: OrderFunction;
    onDeleteItem?: OrderFunction;
    onAddItem?: any;
};
