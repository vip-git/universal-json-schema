/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

// Material UI
import { withStyles } from '@material-ui/styles';

// Style
import fieldSetStyles from './field-set-styles';

// Helpers
import getDefinitionSchemaFromRef from '../helpers/get-definition-schema';

// Types
import { FieldSetArrayProps } from '../types/FieldSetArray.type';

// Utils
import Utils from '../helpers/utils';

// Variant
import RENDER_ARRAY_WRAPPERS from './variants/fieldset-array/field-array.wrappers';

export const RawFieldSetArray = (props: FieldSetArrayProps) => {
  const {
    startIdx = 0,
    className,
    classes,
    schema = {},
    uiSchema = {},
    definitions = {},
    data,
    path,
    onMoveItemUp,
    onMoveItemDown,
    onDeleteItem,
    ...rest
  } = props;
  // const schema = { ...givenSchema };
  const canReorder = uiSchema && uiSchema['ui:options'] && uiSchema['ui:options'].canReorder;
  const allowRecursive = uiSchema && uiSchema['ui:options'] && uiSchema['ui:options'].allowRecursive;
  const hasSelectWidget = uiSchema && uiSchema['ui:widget'];
  const isRecursiveHole = () => {
    if (schema.infiniteRecursive) {
      return false;
    }

    const getRecursiveRef = path.replace(/\[(.*?)\]/g, '');
    if (getRecursiveRef.includes('.')) {
      const findRecursiveChild = getRecursiveRef.split('.');
      return (findRecursiveChild.length > 2 
              && findRecursiveChild[findRecursiveChild.length - 1] 
              === findRecursiveChild[findRecursiveChild.length - 2]);
    }

    return false;
  };

  if (hasSelectWidget) {
    schema.uniqueItems = true;
  }

  try {
    if (schema?.items?.$ref) {
      schema.items = { 
        ...getDefinitionSchemaFromRef(definitions, schema.items, data),
      };
    }
  } 
  catch (err) {
    // console.log('err')
  }

  return (
    <div className={classes.root}>
      {
        Utils.callFunctionIfExists(RENDER_ARRAY_WRAPPERS({
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
        }), Utils.getFieldSetRenderComponent({
          schema,
          data,
        }))
      }
      {
        Utils.callFunctionIfExists(
          RENDER_ARRAY_WRAPPERS({
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
          }), 
          Utils.doesSchemaHaveAdditionalItems(schema),
        )
      }
    </div>
  );
};
export default withStyles(fieldSetStyles.fieldSetArray)(RawFieldSetArray);
