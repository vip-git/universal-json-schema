// Library
import without from 'lodash/without';

// Utils
import { UTIL_CONFIG } from '../../utils';

const {
  ENUM_UTILS: {
    util: { valuesToOptions, isEnum },
  },
} = UTIL_CONFIG;

const doOnChange = (onChange) => (e, checked) => onChange(checked);

const onCheckboxChangeHandler = (givenOnChange, value) => (e, checked) => {
  if (checked) {
    givenOnChange(value);
  }
  else {
    givenOnChange('');
  }
};

export default ({ onChange, schema = {} }) => ({
  onChange: doOnChange(onChange),
  onGroupChange: (value) => onChange && onCheckboxChangeHandler(onChange, value),
  label: schema.title,
  choices: valuesToOptions(isEnum(schema)),
});
