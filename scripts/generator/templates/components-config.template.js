const appConfigTemplate = `/* eslint-disable global-require */
//  Imports
<% Object.values(components).filter((c) => c.isEnum && !c.notAvailable).forEach((comp) => { %>
  import <%= comp.name.replace(/-/g, '') %> from './<%= comp.name %>/dist/index';
 <% }); %>
import <%= Object.values(components).find((c) => c.isDefault).name.replace(/-/g, '') %> from './<%= Object.values(components).find((c) => c.isDefault).name %>/dist/index';
import EmptyDiv from './empty-div/dist/index';

<% Object.values(components)
    .filter((c) => !c.isEnum && c.type === "null" && !c.notAvailable && !c.isDefault).forEach((comp) => { %>
import <%= comp.name.replace(/-/g, '') %> from './<%= comp.name %>/dist/index';
<% }); %>

<% Object.values(components)
    .filter((c) => !c.isEnum && c.type === "integer" && !c.notAvailable && !c.isDefault).forEach((comp) => { %>
import <%= comp.name.replace(/-/g, '') %> from './<%= comp.name %>/dist/index';
<% }); %>

<% Object.values(components)
    .filter((c) => !c.isEnum && c.type === "number" && !c.notAvailable && !c.isDefault).forEach((comp) => { %>
import <%= comp.name.replace(/-/g, '') %> from './<%= comp.name %>/dist/index';
<% }); %>

<% Object.values(components)
    .filter((c) => !c.isEnum && c.type === "boolean" && !c.notAvailable && !c.isDefault).forEach((comp) => { %>
import <%= comp.name.replace(/-/g, '') %> from './<%= comp.name %>/dist/index';
<% }); %>

<% Object.values(components)
    .filter((c) => !c.isEnum && c.type === "string" && !c.notAvailable && !c.isDefault).forEach((comp) => { %>
import <%= comp.name.replace(/-/g, '') %> from <% if(comp.hasDist) { %> './<%= comp.name %>/dist/index' <% } else { %> './<%= comp.name %>' <% } %>;
<% }); %>

export const ENUM_COMPONENTS = {
 <% Object.values(components).filter((c) => c.isEnum && !c.notAvailable).forEach((comp) => { %>
  <%= comp.name.toUpperCase().replace(/-/g, '_') %>: {
    name: '<%= comp.name %>',
    component: <%= comp.name.replace(/-/g, '') %>,
  },
 <% }); %>
};

export const COMMON_COMPONENTS = {
  NORMAL_INPUT: {
    name: '<%= Object.values(components).find((c) => c.isDefault).name %>',
    component: <%= Object.values(components).find((c) => c.isDefault).name.replace(/-/g, '') %>,
  },
};

const NULL_COMPONENTS = {
  EMPTY_DIV: {
    name: 'empty-div',
    component: EmptyDiv,
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

const DEFAULT_NULL_COMPONENTS = {
  DEFAULT: {
    ...NULL_COMPONENTS.EMPTY_DIV,
    name: 'DEFAULT',
  },
};

<% if(Object.keys(components).includes('@react-jsonschema-form-components/material-picker')) { %>
export const V2_PICKER_COMPONENT = {
  MATERIAL_PICKER: {
    name: 'material-picker',
    component: materialpicker,
  },
};
<% } %>

export const COMP_CONFIG = {
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
  V2_DEPRECATED_ENUMS: ['material-select', 'material-multiselect'],
  V2_DEPRECATED_CREATABLE_ENUMS: ['creatable-select'],
  V2_DEPRECATED_PICKERS: ['material-date', 'material-datetime', 'material-time'],
  V2_DEPRECATED_WIDGET_RADIO: 'radio',
  V2_DEPRECATED_WIDGET_RANGE: 'range',
  V2_DEPRECATED_WIDGET_CHECKBOXES: 'checkboxes',
  COMPONENT_MAPPING: {
    STRING: {
      ...ENUM_COMPONENTS,
      ...COMMON_COMPONENTS,
     <% Object.values(components)
          .filter((c) => !c.isEnum && c.type === "string" && !c.notAvailable && !c.isDefault).forEach((comp) => { %>
      <%= comp.name.toUpperCase().replace(/-/g, '_') %>: {
        name: '<%= comp.name %>',
        component: <%= comp.name.replace(/-/g, '') %>,
      },
      <% }); %>
      ...DEFAULT_COMPONENTS,
    },
    BOOLEAN: {
      ...ENUM_COMPONENTS,
      ...COMMON_COMPONENTS,
      <% Object.values(components)
          .filter((c) => !c.isEnum && c.type === "boolean" && !c.notAvailable && !c.isDefault).forEach((comp) => { %>
      <%= comp.name.toUpperCase().replace(/-/g, '_') %>: {
        name: '<%= comp.name %>',
        component: <%= comp.name.replace(/-/g, '') %>,
      },
      <% }); %>
      ...DEFAULT_BOOLEAN_COMPONENTS,
    },
    NUMBER: {
      ...COMMON_INT_COMPONENTS,
      ...DEFAULT_COMPONENTS,
      <% Object.values(components)
          .filter((c) => !c.isEnum && c.type === "number" && !c.notAvailable && !c.isDefault).forEach((comp) => { %>
      <%= comp.name.toUpperCase().replace(/-/g, '_') %>: {
        name: '<%= comp.name %>',
        component: <%= comp.name.replace(/-/g, '') %>,
      },
      <% }); %>
    },
    INTEGER: {
      ...COMMON_INT_COMPONENTS,
      ...DEFAULT_COMPONENTS,
      <% Object.values(components)
          .filter((c) => !c.isEnum && c.type === "integer" && !c.notAvailable && !c.isDefault).forEach((comp) => { %>
      <%= comp.name.toUpperCase().replace(/-/g, '_') %>: {
        name: '<%= comp.name %>',
        component: <%= comp.name.replace(/-/g, '') %>,
      },
      <% }); %>
    },
    NULL: {
      ...DEFAULT_NULL_COMPONENTS,
      <% Object.values(components)
          .filter((c) => !c.isEnum && c.type === "null" && !c.notAvailable && !c.isDefault).forEach((comp) => { %>
      <%= comp.name.toUpperCase().replace(/-/g, '_') %>: {
        name: '<%= comp.name %>',
        component: <%= comp.name.replace(/-/g, '') %> ,
      },
      <% }); %>
    },
  },
};

export default COMP_CONFIG;
`;

module.exports = appConfigTemplate;
