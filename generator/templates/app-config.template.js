const appConfigTemplate = `/* eslint-disable global-require */
export const APP_CONFIG = {
  <% modules.forEach((modName) => { %>
  <%= modName.toUpperCase().replace(/-/g, '_') %>: process.env.GENERATED_SESSION_ID 
    // eslint-disable-next-line import/no-dynamic-require
    ? require(\`./\${process.env.GENERATED_SESSION_ID}/<%= modName %>\`) 
    : require('./<%= modName %>'),
  <% }); %>
};

export default APP_CONFIG;
`;

module.exports = appConfigTemplate;
