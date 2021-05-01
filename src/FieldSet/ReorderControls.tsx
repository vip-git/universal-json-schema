// Library
import React from 'react';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import RemoveCircle from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

// Styles
import fieldSetStyles from './field-set-styles';

// Types
import { ReorderControlsProps } from '@core-types/ReorderControls.type';

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
        <IconButton data-testid="upButton" className={classes.up} onClick={onMoveItemUp} disabled={first}>
          <ArrowUpward />
        </IconButton>
        <IconButton data-testid="downButton" className={classes.down} onClick={onMoveItemDown} disabled={last}>
          <ArrowDownward />
        </IconButton>
      </div>
    )}
    <IconButton
      data-testid="closeButton"
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
