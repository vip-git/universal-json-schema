// utils 
import getCurrencyProps from './utils/get-currency-props';
import getInputType from './utils/get-input-type';
import getMuiProps from './utils/get-mui-props';
import getTextAreaProps from './utils/get-text-area-props';

const toNumber = (v, options = false) => {
  if (v === '' || v === undefined) return v;
  if (options && options.useLocaleString) return v.replace(/[^\d,.]/g, '');
  const n = Number(v);
  return !Number.isNaN(n) ? n : v;
};

const coerceValue = (type, value, options = false) => {
  switch (type) {
    case 'string':
      return typeof value === 'string' ? value : String(value);
    case 'number':
    case 'integer':
    case 'double':
    case 'float':
    case 'decimal':
      return toNumber(value, options);
    default:
      return value;
  }
};

const onChangeHandler = (
  onChange,
  type,
  options,
) => (e) => {
  const value = coerceValue(type, e.target.value, options);
  if (value !== undefined) onChange(value);
};

export default ({ onChange, type, options = {}, uiSchema = {}, htmlid, schema = {} }) => ({
  onChange: onChange && onChangeHandler(onChange, type, options),
  type: getInputType(type, uiSchema),
  label: schema.title || '',
  inputProps: {
    id: htmlid,
  },
  ...getCurrencyProps({ onChange, options }),
  ...getTextAreaProps(uiSchema['ui:widget']),
  ...getMuiProps(uiSchema),
});
