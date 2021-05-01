// Shared
import { MouseEventHandler } from 'react';
import { MaterialUIProps } from './shared/MaterialuiProps.type';

export type ReorderControlsProps = MaterialUIProps & {
    first: string;
    last: string;
    onMoveItemUp?: MouseEventHandler<HTMLButtonElement>;
    onMoveItemDown?: MouseEventHandler<HTMLButtonElement>;
    onDeleteItem?: MouseEventHandler<HTMLButtonElement>;
    canReorder?: MouseEventHandler<HTMLButtonElement>;
};