import React from 'react';
import IconButton from 'material-ui/IconButton';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import RemoveCircle from '@material-ui/icons/Close';
import { withStyles } from 'material-ui/styles';
import fieldSetStyles from './field-set-styles';

export const RawReorderControls = ({ first, last, classes, onMoveItemUp, onMoveItemDown, onDeleteItem }) => (
  <div className={classes.root}>
    {/* Needs improvement - we will enable this later in stage !
    <IconButton className={classes.up} onClick={onMoveItemUp} disabled={first}><ArrowUpward /></IconButton>
    <IconButton className={classes.down} onClick={onMoveItemDown} disabled={last}><ArrowDownward /></IconButton> */}
    {!first && <IconButton className={classes.remove} onClick={onDeleteItem} ><RemoveCircle /></IconButton> }
  </div>
);
export default withStyles(fieldSetStyles.reorderControls)(RawReorderControls);
