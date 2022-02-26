
const commonParser = require('./component-script.template');

const componentFile = `
<script>
${commonParser('compName', '../..')}
</script>
<slot />
`;

module.exports = componentFile;
