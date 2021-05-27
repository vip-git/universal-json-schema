const appConfigTemplate = `/* eslint-disable global-require */
// Imports
<% modules.forEach((modName) => { %>
  import <%= modName.replace(/-/g, '') %> from './<%= modName %>';
<% }); %>

export const APP_CONFIG = {
  <% modules.forEach((modName) => { %>
  <%= modName.toUpperCase().replace(/-/g, '_') %>: <%= modName.replace(/-/g, '') %>,
  <% }); %>
};

export default APP_CONFIG;
`;

module.exports = appConfigTemplate;
