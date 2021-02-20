// utils 
import { UTIL_CONFIG } from '../../utils';
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

const onChangeHandler = (onChange, type, options) => (e) => {
  const valueUI = coerceValue(type, e.target.value, options);
  const valueForm = coerceValue(type, e.target.value, {
    ...options,
    isFormData: true,
  });
  if (valueForm !== undefined) onChange(valueForm, valueUI);
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
    ...options,
  },
  ...getTextAreaProps(uiSchema['ui:widget']),
  ...getMuiProps(uiSchema),
});
