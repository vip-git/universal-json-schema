const appConfigTemplate = `/* eslint-disable global-require */
export const APP_CONFIG = {
  <% modules.forEach((modName) => { %>
  <%= modName.toUpperCase().replace(/-/g, '_') %>: require('./<%= modName %>'),
  <% }); %>
};

export default APP_CONFIG;
`;

module.exports = appConfigTemplate;
