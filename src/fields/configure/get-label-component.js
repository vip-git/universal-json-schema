// import Input, { InputLabel } from 'material-ui/Input'; // eslint-disable-line import/no-named-default
import { FormLabel } from 'material-ui/Form';

const { InputLabel } = require('material-ui/Input');


export default ({ schema, uiSchema = {} }) => {
  const widget = uiSchema['ui:widget'];
  const { type } = schema;

  if (schema.enum && widget === 'radio') {
    return FormLabel;
  }
  // boolean
  if (type === 'boolean' || widget === 'checkboxes' || type === 'material-date' || widget === 'material-multiselect' || widget === 'material-select' || type === 'material-time' || type === 'material-datetime') return null;
  return InputLabel;
};
