const variablesScript = ({
    compName
}) => `// Variables
const ruleProps = { resolvedFacts: {} };
<%if(Array.isArray(variables[${compName}])) { variables[${compName}].forEach((vObj) => {if(vObj) {%><% if(Object.keys(vObj)[0] === "ruleProps") {%> 
ruleProps.<%= Object.keys(vObj.ruleProps)[0] %> = {
    <% vObj.ruleProps[Object.keys(vObj.ruleProps)[0]].forEach((ruleProp, ruleIndex) => { 
        if(typeof ruleProp === 'string'){%>    <%=ruleProp%><%if(ruleIndex !== vObj.ruleProps[Object.keys(vObj.ruleProps)[0]].length - 1) {%>,<%}%>
<%} else if (typeof ruleProp === 'object'){%> <%=Object.keys(ruleProp)[0]%>: <%=ruleProp[Object.keys(ruleProp)[0]]%><%if(ruleIndex !== vObj.ruleProps[Object.keys(vObj.ruleProps)[0]].length - 1) {%>,<%}%> 
    <% } }) %>
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
}; <%}%><% }}) } %>`;

module.exports = variablesScript;
