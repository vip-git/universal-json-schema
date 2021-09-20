// Library
import React from 'react';

// Material UI
import IconButton from '@mui/material/IconButton';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import RemoveCircle from '@mui/icons-material/Close';

// Styles
import { ReorderControlsProps } from '@core-types/ReorderControls.type';
import fieldSetStyles from './field-set-styles';

// Types

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
