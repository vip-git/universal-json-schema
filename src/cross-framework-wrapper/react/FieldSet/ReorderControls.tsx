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
    Div,
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
    <Div className={classes.root}>
      {canReorder && (
        <Div>
          <IconButton data-testid='upButton' onClick={onMoveItemUp} disabled={first}>
            <ArrowUpward />
          </IconButton>
          <IconButton data-testid='downButton' onClick={onMoveItemDown} disabled={last}>
            <ArrowDownward />
          </IconButton>
        </Div>
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
    </Div>
  );
};
export default RawReorderControls;
