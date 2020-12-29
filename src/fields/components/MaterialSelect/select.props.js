// Utils
import { valuesToOptions } from '../../utils/enum-utils';
import { coerceValue } from '../../utils/parse-values';

const onChangeHandler = (onChange, type) => (e) => {
  const value = coerceValue(type, e.target.value);
  if (value !== undefined) onChange(value);
};

export default ({ onChange, schema = {}, type }) => ({
  onChange: onChange && onChangeHandler(onChange, type),
  choices: valuesToOptions(schema.enum),
  nullOption: 'Please select...',
  label: schema.title || '',
});
