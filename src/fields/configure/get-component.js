// import Input, { InputLabel } from 'material-ui/Input'; // eslint-disable-line import/no-named-default
const { RadioGroup, Select, Checkbox, Picker, MultiSelect, CreatableSelect } = require('../components');

const Input = require('material-ui/Input').default;

export default ({ schema, uiSchema = {} }) => {
  // console.log('getComponent schema: %o, uiSchema: %o', schema, uiSchema);
  const widget = uiSchema['ui:widget'];
  const { type } = schema;

  if (schema.enum) {
    if (widget === 'radio') {
      return RadioGroup;
    }
    else if (widget === 'checkboxes') {
      return Checkbox;
    } 
    else if (widget === 'material-select' || widget === 'material-multiselect') {
      return MultiSelect;
    }
    
    return Select;
  }
  else if (type === 'boolean') {
    return Checkbox;
  }
  else if (type === 'material-date' || type === 'material-time' || type === 'material-datetime') {
    return Picker;
  }
  
  if (widget === 'creatable-select') {
    return CreatableSelect;
  }
  
  return Input;
};
