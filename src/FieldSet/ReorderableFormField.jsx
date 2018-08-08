import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import FormField from '../FormField';
import fieldSetStyles from './field-set-styles';
import ReorderControls from './ReorderControls';

export const RawReorderableFormField = ({
  first, last, className, classes, path, onMoveItemUp, onMoveItemDown, onDeleteItem, ...rest
}) =>
  (
    <div className={classNames(className, classes.root)}>
      <FormField
        path={path}
        {...rest}
      />
      <ReorderControls
        first={first}
        last={last}
        onMoveItemUp={onMoveItemUp}
        onMoveItemDown={onMoveItemDown}
        onDeleteItem={onDeleteItem}
      />
    </div>
  );
export default withStyles(fieldSetStyles.reorderable)(RawReorderableFormField);
