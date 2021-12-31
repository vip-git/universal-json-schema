const generateSvelteFramework = ({
    shelljs,
    transformJSONtoCode,
    format,
    ejs,
    components,
    properties,
    rules
}) => {
    const frameworkName = 'svelte';
    shelljs.rm('-rf', `${shelljs.pwd()}/src/universal-schema/json/generated`);
    shelljs.rm('-rf', `${shelljs.pwd()}/src/universal-schema/json/generated-${frameworkName}`);
    shelljs.mkdir(`${shelljs.pwd()}/src/universal-schema/json/generated-${frameworkName}`);
    shelljs.mkdir(`${shelljs.pwd()}/src/universal-schema/json/generated-${frameworkName}/components`);
    const jsonComponents = transformJSONtoCode(frameworkName);
    Object.keys(jsonComponents).forEach((componentName) => {
        let reactSyntax = jsonComponents[componentName];
        try {
            reactSyntax = format(jsonComponents[componentName]);
        } catch(err) {
            reactSyntax = format(`<main>${jsonComponents[componentName]}</main>`);
        }
    
        const appTsx = `<script lang="ts">
// Components
<% components.${componentName}.forEach((componentName) => { %> import <%= componentName %> from '<% if(Object.keys(components).includes(componentName)) {%>./<% } else { %>./components/<%}%><%= componentName %>.svelte';
<% }); %>
// Parsers
import { rulesParser } from '../helpers/rules-parser';
// Properties <% properties.${componentName}.forEach((propName) => { %> 
export let <%= propName %> = ''; <% }) %>

// Rules <% if(Array.isArray(rules.${componentName})) { rules.${componentName}.forEach((ruleCondition) => { %>
const <%= ruleCondition.name %> = () => true; <% }) } %>
</script>

${reactSyntax}
`;
        
            const componentTsx = `<script>
// Library
import { onDestroy, onMount } from "svelte";

// Parsers
import { rulesParser } from '../../helpers/rules-parser';

// Properties <% if(Array.isArray(properties[compName])) { properties[compName].forEach((propName) => { %> 
export let <%= propName %> = ''; <% }) } %>

// Rules <% if(Array.isArray(rules[compName])) { rules[compName].forEach((ruleCondition) => { %>
const <%= ruleCondition.name %> = () => true; <% }) } %>

</script>
<slot />
`;
            const template = ejs.compile(appTsx, {});
            const finalString = template({ components, properties, rules });
            const shellFileString = new shelljs.ShellString(finalString);  
            shellFileString.to(`${shelljs.pwd()}/src/universal-schema/json/generated-${frameworkName}/${componentName}.${frameworkName}`);
        
            components[componentName].filter((cname) => !Object.keys(components).includes(cname)).forEach((compName) => {
                const template = ejs.compile(componentTsx, {});
                const finalString = template({ components, properties, compName, rules });
                const shellFileString = new shelljs.ShellString(finalString);  
                shellFileString.to(`${shelljs.pwd()}/src/universal-schema/json/generated-${frameworkName}/components/${compName}.${frameworkName}`);
            });
    });
    
    return jsonComponents;
}

module.exports = generateSvelteFramework;