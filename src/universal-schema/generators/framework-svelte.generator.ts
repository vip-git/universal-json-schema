// Templates
const componentTsx = require('./svelte/component-file.template');
const appTsx = require('./svelte/app-file.template');

const generateSvelteFramework = ({
    shelljs,
    transformJSONtoCode,
    format,
    ejs,
    components,
    properties,
    rules,
    imports,
    variables
}) => {
    const frameworkName = 'svelte';
    shelljs.rm('-rf', `${shelljs.pwd()}/src/universal-schema/json/generated`);
    shelljs.rm('-rf', `${shelljs.pwd()}/src/universal-schema/json/generated-${frameworkName}`);
    shelljs.mkdir(`${shelljs.pwd()}/src/universal-schema/json/generated-${frameworkName}`);
    shelljs.mkdir(`${shelljs.pwd()}/src/universal-schema/json/generated-${frameworkName}/components`);
    const jsonComponents = transformJSONtoCode(frameworkName);
    Object.keys(jsonComponents).forEach((componentName) => {
        let svelteSyntax = jsonComponents[componentName];
        try {
            svelteSyntax = format(jsonComponents[componentName]);
        } catch(err) {
            svelteSyntax = format(`<main>${jsonComponents[componentName]}</main>`);
        }

        const template = ejs.compile(appTsx({ componentName, svelteSyntax }), {});
        const finalString = template({ components, properties, rules, imports, variables });
        const shellFileString = new shelljs.ShellString(finalString);  
        shellFileString.to(`${shelljs.pwd()}/src/universal-schema/json/generated-${frameworkName}/${componentName}.${frameworkName}`);
    
        components[componentName].filter((cname) => !Object.keys(components).includes(cname)).forEach((compName) => {
            if (!shelljs.test('-f', `${shelljs.pwd()}/src/universal-schema/json/helpers/templates/${compName}.${frameworkName}`)) {
                const template = ejs.compile(componentTsx, {});
                const finalString = template({ components, properties, compName, rules, imports, variables });
                const shellFileString = new shelljs.ShellString(finalString);  
                shellFileString.to(`${shelljs.pwd()}/src/universal-schema/json/generated-${frameworkName}/components/${compName}.${frameworkName}`);
            } else {
                shelljs.cp('-rf', `${shelljs.pwd()}/src/universal-schema/json/helpers/templates/${compName}.${frameworkName}`, `${shelljs.pwd()}/src/universal-schema/json/generated-${frameworkName}/components/${compName}.${frameworkName}`)
            }
        });
    });
    
    return jsonComponents;
}

module.exports = generateSvelteFramework;