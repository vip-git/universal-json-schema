// Shared
import { MouseEventHandler } from 'react';
import { ReorderControlsProps } from './ReorderControls.type';

export type ReorderableFormFieldProps = ReorderControlsProps & {
    dynamicKeyField?: string;
    recursiveDeleteItem?: MouseEventHandler<HTMLButtonElement>;
    schema?: any;
    path: string;
};
