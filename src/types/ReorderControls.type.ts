// Shared
import { MaterialUIProps } from './shared/MaterialuiProps.type';

export type ReorderControlsProps = MaterialUIProps & {
    first: boolean;
    last: boolean;
    onMoveItemUp?: string;
    onMoveItemDown?: string;
    onDeleteItem?: string;
    canReorder?: boolean;
};