// Utils
import { valuesToOptions } from '../../utils/enum-utils';
import { coerceValue, deepStringify } from '../../utils/parse-values';

const onChangeHandler = (onChange, type) => (e) => {
  const value = coerceValue(type, deepStringify(e));
  if (value !== undefined) onChange(value);
};

export default ({
  onChange,
  schema = {},
  uiSchema = {},
  options = {},
  type,
  widget,
}) => ({
  onChange: onChange && onChangeHandler(onChange, type),
  choices: valuesToOptions(schema.enum),
  isClearable: uiSchema['ui:isClearable'] || false,
  placeholder: uiSchema['ui:placeholder'] || '',
  nullOption: 'Please select...',
  optionsOnly: options.optionsOnly || false,
  label: schema.title || '',
  ...options,
});
