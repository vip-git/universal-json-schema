/* eslint-disable global-require */
const ENUM_COMPONENTS = {
  CREATABLE_SELECT: {
    name: 'creatable-select',
    component: require('../components/CreatableSelect').default,
  },
  REACT_SELECT: {
    name: 'material-select',
    component: require('../components/MultiSelect').default,
  },
  REACT_MULTI_SELECT: {
    name: 'material-multiselect',
    component: require('../components/MultiSelect').default,
  },
  MATERIAL_SELECT: {
    name: 'select',
    component: require('../components/Select').default,
  },
  MATERIAL_MULTI_SELECT: {
    name: 'multi-select',
    component: require('../components/Select').default,
  },

  RADIO_GROUP: {
    name: 'radio',
    component: require('../components/RadioGroup').default,
  },

  CHECKBOX: {
    name: 'checkboxes',
    component: require('../components/Checkbox').default,
  },
};

const COMMON_COMPONENTS = {
  NORMAL_INPUT: {
    name: 'input',
    component: require('@material-ui/core/Input').default,
  },
};

const COMMON_INT_COMPONENTS = {
  ...ENUM_COMPONENTS,
  ...COMMON_COMPONENTS,
};

const DEFAULT_COMPONENTS = {
  DEFAULT: {
    ...COMMON_COMPONENTS.NORMAL_INPUT,
    name: 'DEFAULT',
  },
  DEFAULT_ENUM: {
    ...ENUM_COMPONENTS.MATERIAL_SELECT,
    name: 'DEFAULT_ENUM',
  },
};

const DEFAULT_BOOLEAN_COMPONENTS = {
  DEFAULT: {
    ...ENUM_COMPONENTS.CHECKBOX,
    name: 'DEFAULT',
  },
  DEFAULT_ENUM: {
    ...ENUM_COMPONENTS.MATERIAL_SELECT,
    name: 'DEFAULT_ENUM',
  },
};

export const APP_CONFIG = {
  SUPPORTED_TYPES: {
    STRING: 'string',
    BOOLEAN: 'boolean',
    OBJECT: 'object',
    ARRAY: 'array',
    NUMBER: 'number',
    INTEGER: 'integer',
    NULL: 'null',
  },
  V2_DEPRECATED_TYPES: [
    'upload',
    'material-date',
    'material-datetime',
    'material-time',
  ],
  V2_DEPRECATED_OPTIONS: ['rich-text-editor'],
  COMPONENT_MAPPING: {
    STRING: {
      ...ENUM_COMPONENTS,
      ...COMMON_COMPONENTS,

      FILE_UPLOAD: {
        name: 'upload',
        component: require('../components/Upload').default,
      },

      RICH_TEXT_EDITOR: {
        name: 'rich-text-editor',
        component: require('../components/RichTextEditor').default,
      },

      DATE_PICKER: {
        name: 'material-date',
        component: require('../components/Picker').default,
      },

      DATE_TIME_PICKER: {
        name: 'material-datetime',
        component: require('../components/Picker').default,
      },

      TIME_PICKER: {
        name: 'material-time',
        component: require('../components/Picker').default,
      },

      DATE_RANGE_PICKER: {
        name: 'material-rangepicker',
        component: require('../components/Picker').default,
      },

      ...DEFAULT_COMPONENTS,
    },
    BOOLEAN: {
      ...ENUM_COMPONENTS,
      ...COMMON_COMPONENTS,
    },
    NUMBER: {
      ...COMMON_INT_COMPONENTS,
      ...DEFAULT_COMPONENTS,
    },
    INTEGER: {
      ...COMMON_INT_COMPONENTS,
      ...DEFAULT_COMPONENTS,
    },
    NULL: {},
  },
};

export default APP_CONFIG;
