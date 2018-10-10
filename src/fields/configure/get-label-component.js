// import Input, { InputLabel } from 'material-ui/Input'; // eslint-disable-line import/no-named-default
import { FormLabel } from 'material-ui/Form';

const { InputLabel } = require('material-ui/Input');


export default ({ schema, uiSchema = {} }) => {
  const widget = uiSchema['ui:widget'];
  const options = uiSchema['ui:options'];
  const { type } = schema;

  if (schema.enum && widget === 'radio') {
    return FormLabel;
  }
  // boolean
  if (type === 'boolean' || widget === 'checkboxes' || options === 'rich-text-editor' || type === 'material-date' || widget === 'creatable-select' || widget === 'material-multiselect' || widget === 'material-select' || type === 'material-time' || type === 'material-datetime') return null;
  return InputLabel;
};
