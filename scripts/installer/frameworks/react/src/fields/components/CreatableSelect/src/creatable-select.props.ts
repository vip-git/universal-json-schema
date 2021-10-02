// Library
import { values, mapValues } from 'lodash';

// Utils
import { valuesToOptions, isEnum, getEnumTitle } from '@react-jsonschema-form-utils/enum-utils';
import { coerceValue, deepStringify } from '@react-jsonschema-form-utils/parse-values';

type Props = {
  onChange: any;
  schema: any;
  uiSchema: any;
  options: any;
  type: any;
  widget?: any;
  schemaVersion: any;
};

const onChangeHandler = (onChange, type, schemaVersion, schema) => (e) => {
  let value: any = '';
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
  schema,
  uiSchema,
  options,
  type,
  schemaVersion,
}: Props) => ({
  onChange: onChange && onChangeHandler(onChange, type, schemaVersion, schema),
  choices: valuesToOptions(isEnum(schema)),
  isClearable: uiSchema['ui:isClearable'] || false,
  placeholder: uiSchema['ui:placeholder'] || '',
  nullOption: 'Please select...',
  optionsOnly: options.optionsOnly || false,
  label: getEnumTitle(schema),
  ...options,
});
