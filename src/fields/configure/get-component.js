/* eslint-disable no-tabs */
/* eslint-disable max-len */
// import Input, { InputLabel } from '@material-ui/core/Input'; // eslint-disable-line import/no-named-default
const { RadioGroup, Select, Checkbox, Picker, MultiSelect, CreatableSelect, RichTextEditor, Upload } = require('../components');

const Input = require('@material-ui/core/Input').default;

export default ({ schema, uiSchema = {}, components }) => {
  // console.log('getComponent schema: %o, uiSchema: %o', schema, uiSchema);
  const widget = uiSchema['ui:widget'];
  const options = uiSchema['ui:options'];
  const { type, component } = schema;

  if (
    component
		&& component in components
		&& typeof components[component] === 'function'
  ) {
    return components[component];
  }

  if (widget === 'creatable-select') {
    return CreatableSelect;
  }

  if (schema.enum) {
    if (widget === 'radio') {
      return RadioGroup;
    }
    if (widget === 'checkboxes') {
      return Checkbox;
    } 
    if (widget === 'material-select' || widget === 'material-multiselect') {
      return MultiSelect;
    }
    
    return Select;
  }
  if (type === 'boolean') {
    return Checkbox;
  }
  if (type === 'material-date' || type === 'material-time' || type === 'material-datetime') {
    return Picker;
  } 
  if (type === 'upload') {
    return Upload;
  }
  
  if (options === 'rich-text-editor') {
    return RichTextEditor;
  }

  return Input;
};
