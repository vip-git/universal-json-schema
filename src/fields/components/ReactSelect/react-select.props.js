// Utils
import { valuesToOptions } from '../../utils/enum-utils';
import { coerceValue, deepStringify } from '../../utils/parse-values';

const onChangeHandler = (onChange, type) => (e) => {
  const value = coerceValue(type, deepStringify(e));
  if (value !== undefined) onChange(value);
};

export default ({ onChange, schema = {}, uiSchema = {}, type, widget }) => ({
  onChange: onChange && onChangeHandler(onChange, type),
  choices: valuesToOptions(schema.enum),
  multiSelect: widget === 'material-multiselect',
  isClearable: uiSchema['ui:isClearable'] || false,
  placeholder: uiSchema['ui:placeholder'] || '',
  nullOption: 'Please select...',
  label: schema.title || '',
});
