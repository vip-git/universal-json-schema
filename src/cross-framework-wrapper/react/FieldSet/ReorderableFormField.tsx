/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { ReorderableFormFieldProps } from '@core-types/ReoderableFormField.type';
import Framework from '@universal-schema/framework';
import FormField from '../FormField';
import ReorderControls from './ReorderControls';

// Type

// UI

const {
  wrapperComponents: {
    Div,
  },
  styles: {
    FieldSetStyles: fieldSetStyles,
  },
} = Framework.uiFramework;

const classNames = require('classnames');

export const RawReorderableFormField = ({
  first, 
  last, 
  className, 
  path, 
  onMoveItemUp, 
  onMoveItemDown, 
  onDeleteItem, 
  canReorder,
  dynamicKeyField,
  recursiveDeleteItem,
  schema,
  ...rest
}: ReorderableFormFieldProps) => { 
  const classes = fieldSetStyles.reorderable();
  return (
      <Div className={classNames(className, classes.root)}>
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
      </Div>
  );
};

export default RawReorderableFormField;
