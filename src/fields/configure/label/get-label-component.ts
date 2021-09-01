// import Input, { InputLabel } from '@material-ui/core/Input'; // eslint-disable-line import/no-named-default
import FormLabel from '@material-ui/core/FormLabel';
import { isEnum } from '@react-jsonschema-form-utils/enum-utils';

const InputLabel = require('@material-ui/core/InputLabel').default;

export default ({ schema, uiSchema = {} }) => {
  const widget = uiSchema['ui:widget'];
  const options = uiSchema['ui:options'] || uiSchema['ui:props'];
  
  const nonInputTypes = [
    'boolean',
    'upload',
    'material-picker',
    'material-date',
    'material-time',
    'material-datetime',
    'material-auto-complete',
  ];
  
  const nonInputWidgets = [
    'checkboxes',
    'creatable-select',
    'material-multiselect',
    'material-select',
  ];

  const nonInputOptions = ['rich-text-editor'];

  if (isEnum(schema) && widget === 'radio') {
    return FormLabel;
  }
  
  if ((options && nonInputOptions.includes(options)) || options?.type === 'hidden') {
    return null;
  }
  
  if (widget && nonInputWidgets.includes(widget)) {
    return null;
  }
  
  if (schema && schema.type) {
    const { type } = schema;
    if (
      nonInputTypes.includes(type) 
      || nonInputTypes.includes(widget)
    ) {
      return null;
    }
  }

  return InputLabel;
};
