const ruleConstLine = `const <%= ruleCondition.name %> = async () => await rulesParser(<%- ruleCondition.condition || [] %>);`;
const rulesForEachLine = (compName) => `rules[${compName}].forEach((ruleCondition) => { %>${ruleConstLine}<% })`;

const rulesScript = ({
    compName
}) => `// Rules
const { rulesParser } = RulesEngine(ruleProps); 
<% if(Array.isArray(rules[${compName}])) { ${rulesForEachLine(compName)} } %>`;

module.exports = rulesScript;
