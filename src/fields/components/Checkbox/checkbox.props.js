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

const parseMultiSelectValue = (givenValue) => (Array.isArray(givenValue) ? givenValue : [givenValue]);

const onCheckboxChangeHandler = (givenOnChange, value, schema, allValues) => (e, checked) => {
  if (checked) {
    const finalValues = Array.isArray(allValues) ? [...allValues, value] : [value];
    givenOnChange(finalValues);
  }
  else {
    const finalValues = allValues.filter((ev) => ev !== value);
    givenOnChange(finalValues);
  }
};

const onEnumChangeHandler = (givenOnChange, value) => (
  e,
  checked,
) => {
  if (checked) {
    givenOnChange(value);
  } 
  else {
    givenOnChange('');
  }
};

export default ({ onChange, schema = {}, value }) => ({
  onChange: doOnChange(onChange),
  onEnumChange: (givenValue) => onChange && onEnumChangeHandler(onChange, givenValue),
  onGroupChange: (givenValue) => onChange && onCheckboxChangeHandler(onChange, givenValue, schema, value),
  label: schema.title,
  choices: valuesToOptions(isEnum(schema)),
});
