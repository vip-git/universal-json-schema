// Shared
import { MouseEventHandler } from 'react';
import { MaterialUIProps } from './shared/MaterialuiProps.type';

export type ReorderControlsProps = MaterialUIProps & {
    first: boolean;
    last: boolean;
    onMoveItemUp?: any;
    onMoveItemDown?: any;
    onDeleteItem?: any;
    canReorder?: boolean;
};
