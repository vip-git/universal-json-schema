const generateReactFramework = ({
    shelljs,
    transformJSONtoCode,
    format,
    ejs,
    components
}) => {
    const frameworkName = 'react';
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
            reactSyntax = format(`<React.Fragment>${jsonComponents[componentName]}</React.Fragment>`);
        }
    
        const appTsx = `// Library
import React from 'react';
import { If, Then, Else } from 'react-if';

// Components
<% components.${componentName}.forEach((componentName) => { %> import <%= componentName %> from '<% if(Object.keys(components).includes(componentName)) {%>./<% } else { %>./components/<%}%><%= componentName %>';
<% }); %>
const Render = () => (
${reactSyntax}
);

export default Render;
            `;
        
            const componentTsx = `// Library
import React from 'react';
const Render = ({ children = <div /> }: { children?: any }) => children;

export default Render;
            `;
            const template = ejs.compile(appTsx, {});
            const finalString = template({ components });
            const shellFileString = new shelljs.ShellString(finalString);  
            shellFileString.to(`${shelljs.pwd()}/src/universal-schema/json/generated/${frameworkName}/${componentName}.tsx`);
        
            components[componentName].filter((cname) => !Object.keys(components).includes(cname)).forEach((compName) => {
                const shellFileString = new shelljs.ShellString(componentTsx);  
                shellFileString.to(`${shelljs.pwd()}/src/universal-schema/json/generated/${frameworkName}/components/${compName}.tsx`);
            });
    });
    
    return jsonComponents;
}

module.exports = generateReactFramework;