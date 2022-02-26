const exportAsString = `<%=sObj.exports%>`;
const exportAsArray = `<%=sObj.exports.join(", ")%>`;
const importName = `<% if(typeof sObj.exports === "string"){%>${exportAsString}<%} else {%>{${exportAsArray}}<%}%>`;
const importLine = `import ${importName} from '<%= sObj.path %>';`;
const importForEach = ({ compName }) => `<% imports[${compName}].forEach((sObj) => {%> ${importLine} <%}) %>`;

const sideEffectsScript = ({
    compName
}) => `<% if(Array.isArray(imports[${compName}]) && imports[${compName}].length) {%> // Side Effects
${importForEach({ compName })}
<% } %>`;

module.exports = sideEffectsScript;
