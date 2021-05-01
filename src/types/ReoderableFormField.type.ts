// Shared
import { SchemaProps } from './shared/SchemaProps.type';
import { ReorderControlsProps } from '@core-types/ReorderControls.type';

export type OrderFunction = (path: string, index: number) => string;

export type ReorderableFormFieldProps = ReorderControlsProps & SchemaProps & {
    dynamicKeyField?: string;
    recursiveDeleteItem?: OrderFunction;
    required?: Array<string>;
    objectData?: any;
    path: string;
    validation?: any;
    noTitle?: boolean;
};
