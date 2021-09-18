// Library
import React from 'react';

// Material UI
import IconButton from '@mui/material/IconButton';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import RemoveCircle from '@mui/icons-material/Close';
import { withStyles } from '@mui/styles';

// Styles
import { ReorderControlsProps } from '@core-types/ReorderControls.type';
import fieldSetStyles from './field-set-styles';

// Types

export const RawReorderControls = (
  { 
    first,
    last,
    classes,
    onMoveItemUp,
    onMoveItemDown,
    onDeleteItem,
    canReorder,
  }: ReorderControlsProps,
) => (
  <div className={classes.root}>
    {canReorder && (
      <div>
        <IconButton data-testid='upButton' className={classes.up} onClick={onMoveItemUp} disabled={first}>
          <ArrowUpward />
        </IconButton>
        <IconButton data-testid='downButton' className={classes.down} onClick={onMoveItemDown} disabled={last}>
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
export default withStyles(fieldSetStyles.reorderControls)(RawReorderControls);
