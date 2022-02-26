const addCommaIfNeeded = `<%if(ruleIndex !== vObj.ruleProps[Object.keys(vObj.ruleProps)[0]].length - 1) {%>,<%}%>`;
const addCommaIfNeeded2 = `<%if(vObjIndex !== vObj[Object.keys(vObj)[0]].length - 1) {%>,<%}%>`;
const addCommaIfNeeded3 = `<%if(expIndex !== vObj[Object.keys(vObj)[0]].exports.length - 1) {%>,<%}%>`;
const addCommaIfNeeded4 = `<%if(expxIndex !== exp[Object.keys(exp)[0]].length - 1) {%>,<%}%> <%})%>`;

const rulePropWithoutKeyValue = `<%=ruleProp%>${addCommaIfNeeded}`;
const rulePropValue = `<%=ruleProp[Object.keys(ruleProp)[0]]%>${addCommaIfNeeded}`;
const rulePropKey = `<%=Object.keys(ruleProp)[0]%>`;

const rulePropWithoutKeyValue2 = `<%=vObjProp%>${addCommaIfNeeded2}`;

const rulePropKeyValue = `%>${rulePropKey}: ${rulePropValue}
<%`;

const rulePropKeyValue2 = `<%=Object.keys(vObjProp)[0]%>: <%=vObjProp[Object.keys(vObjProp)[0]]%>${addCommaIfNeeded2}`;

const moreConditionRule = `else if(typeof vObj[Object.keys(vObj)[0]] === "object" && vObj[Object.keys(vObj)[0]].implements) {%>
const <% if(vObj[Object.keys(vObj)[0]].exports) { %> { <%vObj[Object.keys(vObj)[0]].exports.forEach((exp, expIndex) => { if (typeof exp === "object") {%>            
<%=Object.keys(exp)[0]%>: {<%exp[Object.keys(exp)[0]].forEach((expx, expxIndex) => {%>    
<%=expx%>${addCommaIfNeeded4}
}${addCommaIfNeeded3}
<%} else {%>
<%=exp%>${addCommaIfNeeded3}<%}})%> 
} <%} else { %> <%=Object.keys(vObj)[0]%> <% } %> = <%=Object.keys(vObj)[0]%>({
<%
vObj[Object.keys(vObj)[0]].implements.forEach((impl, implIndex) => {
%>      <%=impl%><%if(implIndex !== vObj[Object.keys(vObj)[0]].implements.length - 1) {%>,<%}%>
<%})%>});
<%} else if (Array.isArray(vObj[Object.keys(vObj)[0]])) {%>
const <%= Object.keys(vObj)[0] %> = {
<% vObj[Object.keys(vObj)[0]].forEach((vObjProp, vObjIndex) => {if(typeof vObjProp === 'string'){%> ${rulePropWithoutKeyValue2}
<% } else if (typeof vObjProp === 'object'){%> ${rulePropKeyValue2}`

const rulePropObject = `${rulePropWithoutKeyValue}
<%} else if (typeof ruleProp === 'object'){ ${rulePropKeyValue} } }) %>
}; <%} ${moreConditionRule}`;

const rulesProp = `if(typeof ruleProp === 'string'){%> ${rulePropObject} <%}`;

const rulePropsForeach = `<% vObj.ruleProps[Object.keys(vObj.ruleProps)[0]].forEach((ruleProp, ruleIndex) => {
${rulesProp}
}) %>`;

const ruleProps = `%> 
ruleProps.<%= Object.keys(vObj.ruleProps)[0] %> = {
    ${rulePropsForeach}
}; <%`;

const vObj = `%><% if(Object.keys(vObj)[0] === "ruleProps") { ${ruleProps} }%><%`;

const variableExport = `if(vObj) { ${vObj} }`;
    
const variablesForEach = ({ compName }) => `variables[${compName}].forEach((vObj) => { ${variableExport} }) `

const variablesScript = ({
    compName
}) => `// Variables
const ruleProps = { resolvedFacts: {} };
<%if(Array.isArray(variables[${compName}])) { ${variablesForEach({ compName })} } %>`;

module.exports = variablesScript;
