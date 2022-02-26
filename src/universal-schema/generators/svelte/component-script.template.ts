// Script Templates
const sideEffects = require('./script/side-effects-script.template');
const propertiesExport = require('./script/properties-script.template');
const variablesExport = require('./script/variables-script.template');
const rulesExport = require('./script/rules-script.template');
const helpersExport = require('./script/helpers-script.template');

const componentScript = (compName, parserLocation) => `${helpersExport({
    parserLocation
})}

${sideEffects({
    compName
})}

${propertiesExport({
    compName
})}

${variablesExport({
    compName
})}

${rulesExport({
    compName
})}`;

module.exports = componentScript;
