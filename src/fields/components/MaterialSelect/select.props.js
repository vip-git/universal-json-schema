// Utils
import { UTIL_CONFIG } from '../../utils';

const {
  ENUM_UTILS: {
    util: { valuesToOptions, isEnum, getEnumTitle },
  },
  PARSE_VALUES: {
    util: { coerceValue, deepStringify },
  },
} = UTIL_CONFIG;

const onChangeHandler = (onChange, type, isMultiple) => (e) => {
  const value = isMultiple
    ? e.target?.value?.filter((item) => item)
    : coerceValue(type, e.target.value);
  if (value !== undefined) onChange(value);
};

export default ({ onChange, schema = {}, type, isMultiple }) => ({
  onChange: onChange && onChangeHandler(onChange, type, isMultiple),
  choices: valuesToOptions(isEnum(schema)),
  nullOption: 'Please select...',
  label: getEnumTitle(schema),
});
