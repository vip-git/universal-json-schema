// Utils
import { UTIL_CONFIG } from '../../utils';

const {
  ENUM_UTILS: {
    util: { valuesToOptions, isEnum },
  },
  PARSE_VALUES: {
    util: { coerceValue, deepStringify },
  },
} = UTIL_CONFIG;

const onChangeHandler = (onChange, type) => (e) => {
  const value = coerceValue(type, e.target.value);
  if (value !== undefined) onChange(value);
};

export default ({ onChange, schema = {}, type }) => ({
  onChange: onChange && onChangeHandler(onChange, type),
  choices: valuesToOptions(isEnum(schema)),
  nullOption: 'Please select...',
  label: schema.title || '',
});
