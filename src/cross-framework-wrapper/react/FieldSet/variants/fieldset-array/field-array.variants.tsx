// Library
import React from 'react';
import slice from 'lodash/slice';

// Material UI
import IconButton from '@mui/material/IconButton';
import AddCircle from '@mui/icons-material/AddCircle';

// Helpers
import getDefaultValue from '@helpers/get-default-value';

// config
import FIELDSET_CONFIG, { ArrayVariants, ArrayWrapperVariants } from '@config/fieldset.config';

// Component
import FormField from '../../../FormField';
import ReorderableFormField from '../../ReorderableFormField';

const { ARRAY_VARIANTS } = FIELDSET_CONFIG;

export type AllowedVariants = {
    [key in ArrayVariants]: Function;
}

export type AllowedWrapperVariants = {
    [key in ArrayWrapperVariants]: Function;
}

export { ARRAY_VARIANTS };

const FIELDSET_ARRAY_VARIANTS: AllowedVariants = {
  [ARRAY_VARIANTS.HAS_REORDERABLE_BUTTONS]: ({
    path,
    schema,
    d,
    onMoveItemUp,
    onMoveItemDown,
    onDeleteItem,
    uiSchema,
    idx,
    data,
    canReorder,
    definitions,
    startIdx,
    rest,
  }) => (
    <ReorderableFormField
      key={`${path + idx}`}
      path={`${path}[${startIdx + idx}]`}
      required={schema.required}
      schema={schema.items}
      data={d}
      onMoveItemUp={onMoveItemUp && onMoveItemUp(path, startIdx + idx)}
      onMoveItemDown={onMoveItemDown && onMoveItemDown(path, startIdx + idx)}
      onDeleteItem={onDeleteItem && onDeleteItem(path, startIdx + idx)}
      recursiveDeleteItem={onDeleteItem}
      uiSchema={uiSchema.items}
      first={idx === 0}
      last={idx === data.length - 1}
      canReorder={canReorder}
      definitions={definitions}
      {...rest}
    />
  ),
  [ARRAY_VARIANTS.ADD_NEW_BUTTON]: ({
    classes,
    uiSchema,
    rest,
    schema,
    path,
  }) => (
    <div className={classes.addItemBtn}>
      <IconButton
        onClick={rest.onAddItem && rest.onAddItem(path, getDefaultValue(schema.items))}
        data-testid='addButton'
        style={uiSchema['ui:style'] ? {
          ...uiSchema['ui:style'],
        } : {}}
      >
        <AddCircle /> 
          <span 
            style={{ 
              position: 'relative',
              right: 5,
            }}
          >
            { uiSchema['ui:options']?.buttonTitle }
          </span>
      </IconButton>
    </div>
  ),
  [ARRAY_VARIANTS.HAS_ADDITIONAL_ITEMS]: ({
    RawFieldSetArray,
    classes,
    uiSchema,
    rest,
    onMoveItemUp,
    onMoveItemDown,
    onDeleteItem,
    definitions,
    schema,
    data,
    path,
  }) => (
    <RawFieldSetArray
      classes={classes}
      path={path}
      startIdx={schema.items.length}
      required={schema.required}
      schema={{ type: 'array', items: schema.additionalItems }}
      data={slice(data, schema.items.length)}
      uiSchema={uiSchema.additionalItems}
      onMoveItemUp={onMoveItemUp}
      onMoveItemDown={onMoveItemDown}
      onDeleteItem={onDeleteItem}
      definitions={definitions}
      {...rest}
    />
  ),
  [ARRAY_VARIANTS.HAS_ENUM_VALUES]: ({
    path,
    schema,
    uiSchema,
    definitions,
    data,
    rest,
  }) => (
    <FormField
      key={path}
      path={path}
      required={schema.required}
      schema={{ ...schema.items, title: schema.items?.title || schema.title, parsedArray: true }}
      data={data}
      uiSchema={uiSchema}
      definitions={definitions}
      {...rest}
    />
  ),
  [ARRAY_VARIANTS.HAS_ITEMS_ARRAY]: ({
    path,
    idx,
    schema,
    uiSchema,
    definitions,
    startIdx,
    d,
    rest,
  }) => (
    <FormField
        key={`${path + idx}`}
        path={`${path}[${startIdx + idx}]`}
        required={schema.required}
        schema={schema.items[idx]}
        data={d}
        uiSchema={(uiSchema.items || [])[idx]}
        definitions={definitions}
        {...rest}
    />
  ),
};

export default FIELDSET_ARRAY_VARIANTS;
