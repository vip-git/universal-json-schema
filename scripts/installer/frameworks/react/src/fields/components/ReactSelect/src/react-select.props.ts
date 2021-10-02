// Library
import { values, mapValues } from 'lodash';

// Utils
import { valuesToOptions, isEnum, getEnumTitle } from '@react-jsonschema-form-utils/enum-utils';
import { coerceValue, deepStringify } from '@react-jsonschema-form-utils/parse-values';

type Props = {
  onChange: any;
  schema: any;
  uiSchema: any;
  type: any;
  schemaVersion: any;
  widget: any;
  options: any;
}

const onChangeHandler = (
  onChange,
  type,
  schemaVersion,
  isMultiSelect,
  schema,
) => (e) => {
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
  schema,
  uiSchema,
  type,
  schemaVersion,
  widget,
  options,
}: Props) => {
  const multiSelect = (widget === 'material-multiselect'
    || options.multiSelect
    || (schema.anyOf && schema.parsedArray))
    && !schema.oneOf;     
  return {
    onChange:
      onChange
      && onChangeHandler(onChange, type, schemaVersion, multiSelect, schema),
    choices: valuesToOptions(isEnum(schema)),
    multiSelect,
    isClearable: uiSchema['ui:isClearable'] || false,
    placeholder: uiSchema['ui:placeholder'] || '',
    nullOption: 'Please select...',
    label: getEnumTitle(schema),
  };
};
