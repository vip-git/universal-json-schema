// utils 
import { UTIL_CONFIG } from '../../utils';
import getCurrencyProps from './utils/get-currency-props';
import getInputType from './utils/get-input-type';
import getMuiProps from './utils/get-mui-props';
import getTextAreaProps from './utils/get-text-area-props';

const {
  ENUM_UTILS: {
    util: { valuesToOptions, isEnum },
  },
  PARSE_VALUES: {
    util: { coerceValue, deepStringify },
  },
} = UTIL_CONFIG;

const onChangeHandler = (
  onChange,
  type,
  options,
) => (e) => {
  const value = coerceValue(type, e.target.value, options);
  if (value !== undefined) onChange(value);
};

export default ({
  onChange,
  onBlur,
  type,
  options = {},
  uiSchema = {},
  htmlid,
  schema = {},
}) => ({
  onChange: onChange && onChangeHandler(onChange, type, options),
  onBlur: onBlur && onChangeHandler(onBlur, type, options),
  type: getInputType(type, uiSchema),
  label: schema.title || '',
  inputProps: {
    id: htmlid,
  },
  ...getCurrencyProps({ onChange, options }),
  ...getTextAreaProps(uiSchema['ui:widget']),
  ...getMuiProps(uiSchema),
});
