// Utils
import { isEnum, getEnumTitle } from '@react-jsonschema-form-utils/enum-utils';
import { coerceValue } from '@react-jsonschema-form-utils/parse-values';

// Types
import { JSONSchema7, JSONSchema7Type } from 'json-schema';

type Value = boolean | string | Array<string> | JSONSchema7Type;

export type AutoSelectProps = {
  type: any;
  value?: Value;
  schema: JSONSchema7 & { parsedArray?: boolean };
  disabled?: boolean;
  onChange: Function;
  htmlid: any;
  xhrSchema?: any;
  options?: any;
  [key: string]: any;
}

const onChangeHandler = (onChange, type, isMultiple) => (e, givenValue) => {
  const newValue = givenValue || '';
  const value = isMultiple
    ? newValue
    : coerceValue(type, newValue);
  if (value !== undefined) onChange(value);
};

export default ({ onChange, schema, type, isMultiple }) => ({
  onChange: onChange && onChangeHandler(onChange, type, isMultiple),
  choices: isEnum(schema),
  nullOption: 'Please select...',
  label: getEnumTitle(schema),
});
