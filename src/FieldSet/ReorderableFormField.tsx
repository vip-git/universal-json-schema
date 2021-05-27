/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormField from '../FormField';
import fieldSetStyles from './field-set-styles';
import ReorderControls from './ReorderControls';

// Type
import { ReorderableFormFieldProps } from '../types/ReoderableFormField.type';

const classNames = require('classnames');

export const RawReorderableFormField = ({
  first, 
  last, 
  className, 
  classes, 
  path, 
  onMoveItemUp, 
  onMoveItemDown, 
  onDeleteItem, 
  canReorder,
  dynamicKeyField,
  recursiveDeleteItem,
  schema,
  ...rest
}: ReorderableFormFieldProps) => (
  <div className={classNames(className, classes.root)}>
    {dynamicKeyField && (
      <FormField
        path={path}
        {...rest}
        schema={{ ...schema, type: 'string' }}
        data={dynamicKeyField}
        dynamicKeyField={'key'}
      />
    )}
    <FormField
      path={path}
      {...rest}
      schema={schema}
      onDeleteItem={recursiveDeleteItem}
    />
    <ReorderControls
      first={first}
      last={last}
      onMoveItemUp={onMoveItemUp}
      onMoveItemDown={onMoveItemDown}
      onDeleteItem={onDeleteItem}
      canReorder={canReorder}
    />
  </div>
);

export default withStyles(fieldSetStyles.reorderable)(RawReorderableFormField);
