const generateSvelteFramework = ({
    shelljs,
    transformJSONtoCode,
    format,
    ejs,
    components
}) => {
    const frameworkName = 'svelte';
    shelljs.rm('-rf', `${shelljs.pwd()}/src/universal-schema/json/generated`);
    shelljs.mkdir(`${shelljs.pwd()}/src/universal-schema/json/generated`);
    shelljs.mkdir(`${shelljs.pwd()}/src/universal-schema/json/generated/${frameworkName}`);
    shelljs.mkdir(`${shelljs.pwd()}/src/universal-schema/json/generated/${frameworkName}/components`);
    const jsonComponents = transformJSONtoCode(frameworkName);

    Object.keys(jsonComponents).forEach((componentName) => {
        let reactSyntax = jsonComponents[componentName];
        try {
            reactSyntax = format(jsonComponents[componentName]);
        } catch(err) {
            reactSyntax = format(`<main>${jsonComponents[componentName]}</main>`);
        }
    
        const appTsx = `<script>
// Components
<% components.${componentName}.forEach((componentName) => { %> import <%= componentName %> from '<% if(Object.keys(components).includes(componentName)) {%>./<% } else { %>./components/<%}%><%= componentName %>.svelte';
<% }); %>
</script>

${reactSyntax}
`;
        
            const componentTsx = `<script>
// Library
import { onDestroy, onMount } from "svelte";
</script>
<slot />
`;
            const template = ejs.compile(appTsx, {});
            const finalString = template({ components });
            const shellFileString = new shelljs.ShellString(finalString);  
            shellFileString.to(`${shelljs.pwd()}/src/universal-schema/json/generated/${frameworkName}/${componentName}.${frameworkName}`);
        
            components[componentName].filter((cname) => !Object.keys(components).includes(cname)).forEach((compName) => {
                const shellFileString = new shelljs.ShellString(componentTsx);  
                shellFileString.to(`${shelljs.pwd()}/src/universal-schema/json/generated/${frameworkName}/components/${compName}.${frameworkName}`);
            });
    });
    
    return jsonComponents;
}

module.exports = generateSvelteFramework;