const interceptorConfigTemplate = `/* eslint-disable global-require */
export const INTERCEPTOR_CONFIG = {
   <% Object.values(interceptors).forEach((interceptor) => { %>
   <%= interceptor.name.toUpperCase().replace(/-/g, '_') %>: {
     name: '<%= interceptor.name %>',
     interceptor: require('./<%= interceptor.name %>'),
   },
   <% }); %>
};

export default INTERCEPTOR_CONFIG;
`;

module.exports = interceptorConfigTemplate;
