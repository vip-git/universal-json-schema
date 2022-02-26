const stringLine = `export let <%= propObj.propName %> = '';`;
const functionLine = `export let <%= propObj.propName %>: any = () => {};`;
const booleanLine = `export let <%= propObj.propName %> = false; `;
const objectLine = `export let <%= propObj.propName %>: any = {};`;
const defaultLine = `export let <%= propObj.propName %> = '';`;

const propertiesSwitch = `switch (propObj.type) {
    case 'string': %>${stringLine}
<% return;
    case 'function': %>${functionLine}
<% return;
    case 'boolean': %>${booleanLine}
<% return;
    case 'object': %>${objectLine} 
<% return;
    default: %>${defaultLine} 
<% return;
}`;

const propertiesForEach = ({
    compName
}) => `properties[${compName}].forEach((propObj) => { ${propertiesSwitch} })`;

const propertiesScript = ({
    compName
}) => `// Properties 
<% if(Array.isArray(properties[${compName}])) { ${propertiesForEach({ compName })} } %>`;

module.exports = propertiesScript;
