// Types
type HasReorderableButtons = 'hasReorderableButtons';
type AddNewButton = 'addNewButton';
type HasItemsArray = 'hasItemsArray';
type HasEnumValues = 'hasEnumValues';
type HasAdditionalItems = 'hasAdditionalItems';
type HasRecursiveFields = 'hasRecursiveFields';

export type ArrayVariants = HasReorderableButtons
                            | AddNewButton
                            | HasItemsArray
                            | HasEnumValues
                            | HasAdditionalItems;

export type ArrayWrapperVariants = HasItemsArray
                                | HasEnumValues
                                | HasAdditionalItems
                                | HasRecursiveFields;

type FieldSetConfig = {
    ARRAY_VARIANTS: {
        HAS_REORDERABLE_BUTTONS: 'hasReorderableButtons',
        ADD_NEW_BUTTON: 'addNewButton',
        HAS_ITEMS_ARRAY: 'hasItemsArray',
        HAS_ENUM_VALUES: 'hasEnumValues',
        HAS_ADDITIONAL_ITEMS: 'hasAdditionalItems',
        HAS_RECURSIVE_FIELDS?: 'hasRecursiveFields',
    },
    OBJECT_VARIANTS: {},
    STEPPER_VARIANTS: {},
    TABS_VARIANTS: {}
}

const FIELDSET_CONFIG: FieldSetConfig = {
  ARRAY_VARIANTS: {
    HAS_REORDERABLE_BUTTONS: 'hasReorderableButtons',
    ADD_NEW_BUTTON: 'addNewButton',
    HAS_ITEMS_ARRAY: 'hasItemsArray',
    HAS_ENUM_VALUES: 'hasEnumValues',
    HAS_ADDITIONAL_ITEMS: 'hasAdditionalItems',
    HAS_RECURSIVE_FIELDS: 'hasRecursiveFields',
  },
  OBJECT_VARIANTS: {

  },
  STEPPER_VARIANTS: {

  },
  TABS_VARIANTS: {

  },
};

export default FIELDSET_CONFIG;
