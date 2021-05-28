const interceptorConfigTemplate = `/* eslint-disable global-require */
// Imports
<% Object.values(interceptors).forEach((interceptor) => { %>
  import <%= interceptor.name.replace(/-/g, '') %> from './<%= interceptor.name %>';
<% }); %>

export const INTERCEPTOR_CONFIG = {
   <% Object.values(interceptors).forEach((interceptor) => { %>
   '<%= interceptor.name.toLowerCase() %>': {
     name: '<%= interceptor.name %>',
     interceptor: <%= interceptor.name.replace(/-/g, '') %>,
   },
   <% }); %>
};

export default INTERCEPTOR_CONFIG;
`;

module.exports = interceptorConfigTemplate;
