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
        let reactSyntax = jsonComponents[componentName];
        try {
            reactSyntax = format(jsonComponents[componentName]);
        } catch(err) {
            reactSyntax = format(`<main>${jsonComponents[componentName]}</main>`);
        }

        const commonParsers = (compName, parserLocation) => `// Rules Engine
import { RulesEngine } from '../helpers/rules-parser';
<% 
if(Array.isArray(imports[${compName}]) && imports[${compName}].length) {%>
// Side Effects <% 
imports[${compName}].forEach((sObj) => {
%>
import <% if(typeof sObj.exports === "string"){%><%=sObj.exports%><%} else {%>{ <%=sObj.exports.join(", ")%> }<%}%> from '<%= sObj.path %>';
<% }) } %>

// Properties 
<% if(Array.isArray(properties[${compName}])) { properties[${compName}].forEach((propObj) => { 
    switch (propObj.type) {
        case 'string':
%>export let <%= propObj.propName %> = '';
<%
        return;
        case 'function':
%>export let <%= propObj.propName %>: any = () => {};
<%
        return;
        case 'boolean':
%>export let <%= propObj.propName %> = false; 
<%
        return;
        case 'object':
%>export let <%= propObj.propName %> = {}; 
<% 
        return;
        default: 
%>export let <%= propObj.propName %> = ''; 
<%
        return;
    }
}) } %>

// Variables
const ruleProps = { resolvedFacts: {} };
<%if(Array.isArray(variables[${compName}])) { variables[${compName}].forEach((vObj) => {if(vObj) {%><% if(Object.keys(vObj)[0] === "ruleProps") {%> 
ruleProps.<%= Object.keys(vObj.ruleProps)[0] %> = {<% vObj.ruleProps[Object.keys(vObj.ruleProps)[0]].forEach((ruleProp, ruleIndex) => { %>
    <%=ruleProp%><%if(ruleIndex !== vObj.ruleProps[Object.keys(vObj.ruleProps)[0]].length - 1) {%>,<%}%><% }) %>
}; <%} else if(typeof vObj[Object.keys(vObj)[0]] === "object" && vObj[Object.keys(vObj)[0]].implements) {%>
const <% if(vObj[Object.keys(vObj)[0]].exports) { %> { <%vObj[Object.keys(vObj)[0]].exports.forEach((exp, expIndex) => { if (typeof exp === "object") {%>            
    <%=Object.keys(exp)[0]%>: {<%exp[Object.keys(exp)[0]].forEach((expx, expxIndex) => {%>    
        <%=expx%><%if(expxIndex !== exp[Object.keys(exp)[0]].length - 1) {%>,<%}%> <%})%>
    }<%if(expIndex !== vObj[Object.keys(vObj)[0]].exports.length - 1) {%>,<%}%>
    <%} else {%>
    <%=exp%><%if(expIndex !== vObj[Object.keys(vObj)[0]].exports.length - 1) {%>,<%}%><%}})%> 
} <%} else { %> <%=Object.keys(vObj)[0]%> <% } %> = <%=Object.keys(vObj)[0]%>({
<%
vObj[Object.keys(vObj)[0]].implements.forEach((impl, implIndex) => {
%>      <%=impl%><%if(implIndex !== vObj[Object.keys(vObj)[0]].implements.length - 1) {%>,<%}%>
<%})%>});
<%} else if (Array.isArray(vObj[Object.keys(vObj)[0]])) {%>
const <%= Object.keys(vObj)[0] %> = {
<% vObj[Object.keys(vObj)[0]].forEach((vObjProp, vObjIndex) => {if(typeof vObjProp === 'string'){%>     <%=vObjProp%><%if(vObjIndex !== vObj[Object.keys(vObj)[0]].length - 1) {%>,<%}%>
<% } else if (typeof vObjProp === 'object'){%>     <%=Object.keys(vObjProp)[0]%>: <%=vObjProp[Object.keys(vObjProp)[0]]%><%if(vObjIndex !== vObj[Object.keys(vObj)[0]].length - 1) {%>,<%}%> 
<% } }) %>
}; <%}%><% }}) } %>


// Rules
const { rulesParser } = RulesEngine(ruleProps); 
<% if(Array.isArray(rules[${compName}])) { rules[${compName}].forEach((ruleCondition) => { %>
const <%= ruleCondition.name %> = async () => await rulesParser(<%- ruleCondition.condition || [] %>);<% }) } %>`;
    
        const appTsx = `<script lang="ts">
// Components
<% components.${componentName}.forEach((componentName) => { %> import <%= componentName %> from '<% if(Object.keys(components).includes(componentName)) {%>./<% } else { %>./components/<%}%><%= componentName %>.svelte';
<% }); %>
${commonParsers(`"${componentName}"`, '..')}
</script>

${reactSyntax}
`;
        
            const componentTsx = `<script>
// Library
import { onDestroy, onMount } from "svelte";

${commonParsers('compName', '../..')}
</script>
<slot />
`;
            const template = ejs.compile(appTsx, {});
            const finalString = template({ components, properties, rules, imports, variables });
            const shellFileString = new shelljs.ShellString(finalString);  
            shellFileString.to(`${shelljs.pwd()}/src/universal-schema/json/generated-${frameworkName}/${componentName}.${frameworkName}`);
        
            components[componentName].filter((cname) => !Object.keys(components).includes(cname)).forEach((compName) => {
                const template = ejs.compile(componentTsx, {});
                const finalString = template({ components, properties, compName, rules, imports, variables });
                const shellFileString = new shelljs.ShellString(finalString);  
                shellFileString.to(`${shelljs.pwd()}/src/universal-schema/json/generated-${frameworkName}/components/${compName}.${frameworkName}`);
            });
    });
    
    return jsonComponents;
}

module.exports = generateSvelteFramework;