// Library
import { values, mapValues } from 'lodash';

// Utils
import { valuesToOptions } from '../../utils/enum-utils';
import { coerceValue, deepStringify } from '../../utils/parse-values';

const onChangeHandler = (onChange, type, schemaVersion, isMultiSelect) => (e) => {
  let value = '';
  if (String(schemaVersion) === '2') { 
    value = coerceValue(type, deepStringify(e));
  }
  else {
    try {
      const val = coerceValue(type, deepStringify(e));
      const parseMultiSelectValues = (parsedValue) => {
        const finalValues = values(mapValues(JSON.parse(parsedValue), 'value'));
        return type === 'array' ? finalValues : JSON.stringify(finalValues);
      };
      value = isMultiSelect
        ? parseMultiSelectValues(val)
        : JSON.parse(val).value;
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
  type,
  schemaVersion,
  widget,
}) => ({
  onChange:
    onChange
    && onChangeHandler(
      onChange,
      type,
      schemaVersion,
      widget === 'material-multiselect',
    ),
  choices: valuesToOptions(schema.enum),
  multiSelect: widget === 'material-multiselect',
  isClearable: uiSchema['ui:isClearable'] || false,
  placeholder: uiSchema['ui:placeholder'] || '',
  nullOption: 'Please select...',
  label: schema.title || '',
});
