const helpersScript = ({
    parserLocation
}) => `// Helpers
import { RulesEngine } from '${parserLocation}/helpers/rules-parser';
import { FormUtils } from '${parserLocation}/helpers/form.utils';

const Utils = FormUtils();`;

module.exports = helpersScript;
