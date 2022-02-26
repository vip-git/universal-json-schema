
const commonParsers = require('./component-script.template');

const filePath = `<% if(Object.keys(components).includes(componentName)) {%>./<% } else { %>./components/<%}%>`;
const importFileLocation = `${filePath}<%= componentName %>.svelte`;
const importComponentLine = `import <%= componentName %> from '${importFileLocation}'`;

const appFile = ({
    componentName,
    svelteSyntax
}) => `<script lang="ts">
// Components
<% components.${componentName}.forEach((componentName) => { %> ${importComponentLine};
<% }); %>
${commonParsers(`"${componentName}"`, '..')}
</script>

${svelteSyntax}
`;

module.exports = appFile;
