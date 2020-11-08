// import Input, { InputLabel } from '@material-ui/core/Input'; // eslint-disable-line import/no-named-default
import FormLabel from '@material-ui/core/FormLabel';

const InputLabel = require('@material-ui/core/InputLabel').default;

export default ({ schema, uiSchema = {} }) => {
  const widget = uiSchema['ui:widget'];
  const options = uiSchema['ui:options'];
  
  const nonInputTypes = [
    'boolean',
    'upload',
    'material-date',
    'material-time',
    'material-datetime',
  ];
  
  const nonInputWidgets = [
    'checkboxes',
    'creatable-select',
    'material-multiselect',
    'material-select',
  ];

  const nonInputOptions = ['rich-text-editor'];

  if (schema.enum && widget === 'radio') {
    return FormLabel;
  }
  
  if (options && nonInputOptions.includes(options)) {
    return null;
  }
  
  if (widget && nonInputWidgets.includes(widget)) {
    return null;
  }
  
  if (schema && schema.type) {
    const { type } = schema;
    if (nonInputTypes.includes(type)) {
      return null;
    }
  }

  return InputLabel;
};
