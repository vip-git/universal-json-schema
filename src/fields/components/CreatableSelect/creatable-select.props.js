// Library
import { values, mapValues } from 'lodash';

// Utils
import { valuesToOptions } from '../../utils/enum-utils';
import { coerceValue, deepStringify } from '../../utils/parse-values';

const onChangeHandler = (onChange, type, schemaVersion, schema) => (e) => {
  let value = '';
  if (String(schemaVersion) === '2') {
    value = coerceValue(type, deepStringify(e));
  }
  else {
    try {
      const val = coerceValue(type, deepStringify(e));
      const parseMultiSelectValues = (parsedValue) => {
        const finalValues = values(mapValues(JSON.parse(parsedValue), 'value'));
        return schema.parsedArray ? finalValues : JSON.stringify(finalValues);
      };
      value = parseMultiSelectValues(val);
    }
    catch (err) {
      value = coerceValue(type, deepStringify(e));
    }
  }
  if (value !== undefined) onChange(value);
};

export default ({
  onChange,
  schema = {},
  uiSchema = {},
  options = {},
  type,
  widget,
  schemaVersion,
}) => ({
  onChange: onChange && onChangeHandler(onChange, type, schemaVersion, schema),
  choices: valuesToOptions(schema.enum),
  isClearable: uiSchema['ui:isClearable'] || false,
  placeholder: uiSchema['ui:placeholder'] || '',
  nullOption: 'Please select...',
  optionsOnly: options.optionsOnly || false,
  label: schema.title || '',
  ...options,
});
