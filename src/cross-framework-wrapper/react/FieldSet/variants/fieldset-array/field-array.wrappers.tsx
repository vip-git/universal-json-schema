/* eslint-disable no-param-reassign */
// Library
import React from 'react';

// Helpers
import getDefinitionSchemaFromRef from '@helpers/get-definition-schema';

// Utils
import Utils from '@helpers/utils';

// Variants
import FIELDSET_ARRAY_VARIANTS, { 
  AllowedWrapperVariants, 
  ARRAY_VARIANTS,
} from './field-array.variants';

const RENDER_ARRAY_WRAPPER = ({
  schema,
  data,
  isRecursiveHole,
  canReorder,
  definitions,
  startIdx,
  rest,
  onMoveItemUp,
  onMoveItemDown,
  onDeleteItem,
  uiSchema,
  path,
  allowRecursive,
  classes,
  RawFieldSetArray,
}): AllowedWrapperVariants => ({
  [ARRAY_VARIANTS.HAS_RECURSIVE_FIELDS]: () => (
      <div>
        {(Array.isArray(data) ? data : []).map((d, idx) => {
          if (schema?.items?.$ref) {
            schema.items = { 
              ...getDefinitionSchemaFromRef(definitions, schema.items, d),
            };
          }
          return Utils.callFunctionIfExists(
            FIELDSET_ARRAY_VARIANTS, 
            ARRAY_VARIANTS.HAS_REORDERABLE_BUTTONS,
            {
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
            });
        })}
        {(!isRecursiveHole() || allowRecursive) && Utils.callFunctionIfExists(
          FIELDSET_ARRAY_VARIANTS, 
          ARRAY_VARIANTS.ADD_NEW_BUTTON, 
          {
            classes,
            uiSchema,
            rest,
            schema,
            path,
          })}
      </div>
  ),
  [ARRAY_VARIANTS.HAS_ADDITIONAL_ITEMS]: () => Utils.callFunctionIfExists(
    FIELDSET_ARRAY_VARIANTS, 
    'hasAdditionalItems', 
    {
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
    }),
  [ARRAY_VARIANTS.HAS_ENUM_VALUES]: () => Utils.callFunctionIfExists(
    FIELDSET_ARRAY_VARIANTS, 
    ARRAY_VARIANTS.HAS_ENUM_VALUES,
    {
      path,
      schema,
      uiSchema,
      definitions,
      data,
      rest,
    }),
  [ARRAY_VARIANTS.HAS_ITEMS_ARRAY]: () => (data || []).map((d, idx) => {
    if (idx < schema.items.length) {
      if (schema.items[idx].$ref) {
        schema.items[idx] = { 
          ...getDefinitionSchemaFromRef(definitions, schema.items[idx], d),
        };
      }
      return FIELDSET_ARRAY_VARIANTS.hasItemsArray({
        path,
        idx,
        schema,
        uiSchema,
        definitions,
        startIdx,
        d,
        rest,
      });
    }
    return null;
  }),
});

export default RENDER_ARRAY_WRAPPER;
