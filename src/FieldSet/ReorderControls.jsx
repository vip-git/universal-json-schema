import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import RemoveCircle from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import fieldSetStyles from './field-set-styles';

export const RawReorderControls = (
  { 
    first,
    last,
    classes,
    onMoveItemUp,
    onMoveItemDown,
    onDeleteItem,
    canReorder,
  },
) => (
  <div className={classes.root}>
    {canReorder && (
      <div>
        <IconButton className={classes.up} onClick={onMoveItemUp} disabled={first}><ArrowUpward /></IconButton>
        <IconButton className={classes.down} onClick={onMoveItemDown} disabled={last}><ArrowDownward /></IconButton>
      </div>
    )}
    <IconButton
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
