// Utils
import { UTIL_CONFIG } from '../../utils';

const {
  ENUM_UTILS: {
    util: { valuesToOptions, isEnum },
  },
} = UTIL_CONFIG;

const onChangeHandler = (givenOnChange) => (e) => {
  if (e.target.value !== undefined) {
    givenOnChange(e.target.value);
  }
};

export default ({ onChange, options = {}, schema = {} }) => ({
  onChange: onChange && onChangeHandler(onChange),
  row: options.inline,
  label: schema.title,
  choices: valuesToOptions(isEnum(schema)),
});
