const utilConfigTemplate = `/* eslint-disable global-require */
// Imports
<% Object.values(utils).forEach((util) => { %>
  import <%= util.name.replace(/-/g, '') %> from './<%= util.name %>/dist/index';
<% }); %>

export const UTIL_CONFIG = {
   <% Object.values(utils).forEach((util) => { %>
   <%= util.name.toUpperCase().replace(/-/g, '_') %>: {
     name: '<%= util.name %>',
     util: <%= util.name.replace(/-/g, '') %>,
   },
   <% }); %>
};

export default UTIL_CONFIG;
`;

module.exports = utilConfigTemplate;
