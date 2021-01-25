// Utils
import { UTIL_CONFIG } from '../../utils';

const {
  ENUM_UTILS: {
    util: { valuesToOptions, isEnum },
  },
  PARSE_VALUES: {
    util: { coerceValue },
  },
} = UTIL_CONFIG;

const onChangeHandler = (givenOnChange, schema) => (e) => {
  if (e.target.value !== undefined) {
    const value = coerceValue(schema.type, e.target.value);
    givenOnChange(value);
  }
};

export default ({ onChange, options = {}, schema = {} }) => ({
  onChange: onChange && onChangeHandler(onChange, schema),
  row: options.inline,
  label: schema.title,
  choices: valuesToOptions(isEnum(schema)),
});
