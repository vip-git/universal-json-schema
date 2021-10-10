// Library
import React from 'react';

// Styles
import { ReorderControlsProps } from '@core-types/ReorderControls.type';

// UI
import Framework from '@universal-schema/framework';

const {
  wrapperComponents: {
    ArrowUpward,
    ArrowDownward,
    RemoveCircle,
    IconButton,
  },
  styles: {
    FieldSetStyles: fieldSetStyles
  }
} = Framework.uiFramework;

export const RawReorderControls = (
  { 
    first,
    last,
    onMoveItemUp,
    onMoveItemDown,
    onDeleteItem,
    canReorder,
  }: ReorderControlsProps,
) => {
  const classes = fieldSetStyles.reorderControls();
  return (
    <div className={classes.root}>
      {canReorder && (
        <div>
          <IconButton data-testid='upButton' onClick={onMoveItemUp} disabled={first}>
            <ArrowUpward />
          </IconButton>
          <IconButton data-testid='downButton' onClick={onMoveItemDown} disabled={last}>
            <ArrowDownward />
          </IconButton>
        </div>
      )}
      <IconButton
        data-testid='closeButton'
        className={
          canReorder ? [classes.remove, classes.removeCanReorder].join(' ') : classes.remove
        }
        onClick={onDeleteItem}
      >
        <RemoveCircle />
      </IconButton>
    </div>
  );
};
export default RawReorderControls;
