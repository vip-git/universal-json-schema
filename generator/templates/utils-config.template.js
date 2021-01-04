const utilConfigTemplate = `/* eslint-disable global-require */
export const UTIL_CONFIG = {
   <% Object.values(utils).forEach((util) => { %>
   <%= util.name.toUpperCase().replace(/-/g, '_') %>: {
     name: '<%= util.name %>',
     util: require('./<%= util.name %>'),
   },
   <% }); %>
};

export default UTIL_CONFIG;
`;

module.exports = utilConfigTemplate;
