const interceptorConfigTemplate = `/* eslint-disable global-require */
export const INTERCEPTOR_CONFIG = {
   <% Object.values(interceptors).forEach((interceptor) => { %>
   '<%= interceptor.name.toLowerCase() %>': {
     name: '<%= interceptor.name %>',
     interceptor: require('./<%= interceptor.name %>').default,
   },
   <% }); %>
};

export default INTERCEPTOR_CONFIG;
`;

module.exports = interceptorConfigTemplate;
