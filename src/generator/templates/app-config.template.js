const appConfigTemplate = `/* eslint-disable global-require */
const ENUM_COMPONENTS = {
 <% Object.values(components).filter((c) => c.isEnum && !c.notAvailable).forEach((comp) => { %>
  <%= comp.name.toUpperCase().replace(/-/g, '_') %>: {
    name: '<%= comp.name %>',
    component: require('./components/<%= comp.name %>').default,
  },
 <% }); %>
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
    ...ENUM_COMPONENTS.MATERIAL_CHECKBOX,
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
     <% Object.values(components)
          .filter((c) => !c.isEnum && c.type === "string" && !c.notAvailable).forEach((comp) => { %>
      <%= comp.name.toUpperCase().replace(/-/g, '_') %>: {
        name: '<%= comp.name %>',
        component: require('./components/<%= comp.name %>').default,
      },
      <% }); %>
      ...DEFAULT_COMPONENTS,
    },
    BOOLEAN: {
      ...ENUM_COMPONENTS,
      ...COMMON_COMPONENTS,
      <% Object.values(components)
          .filter((c) => !c.isEnum && c.type === "boolean" && !c.notAvailable).forEach((comp) => { %>
      <%= comp.name.toUpperCase().replace(/-/g, '_') %>: {
        name: '<%= comp.name %>',
        component: require('./components/<%= comp.name %>').default,
      },
      <% }); %>
    },
    NUMBER: {
      ...COMMON_INT_COMPONENTS,
      ...DEFAULT_COMPONENTS,
      <% Object.values(components)
          .filter((c) => !c.isEnum && c.type === "number" && !c.notAvailable).forEach((comp) => { %>
      <%= comp.name.toUpperCase().replace(/-/g, '_') %>: {
        name: '<%= comp.name %>',
        component: require('./components/<%= comp.name %>').default,
      },
      <% }); %>
    },
    INTEGER: {
      ...COMMON_INT_COMPONENTS,
      ...DEFAULT_COMPONENTS,
      <% Object.values(components)
          .filter((c) => !c.isEnum && c.type === "integer" && !c.notAvailable).forEach((comp) => { %>
      <%= comp.name.toUpperCase().replace(/-/g, '_') %>: {
        name: '<%= comp.name %>',
        component: require('./components/<%= comp.name %>').default,
      },
      <% }); %>
    },
    NULL: {},
  },
};

export default APP_CONFIG;
`;

module.exports = appConfigTemplate;
