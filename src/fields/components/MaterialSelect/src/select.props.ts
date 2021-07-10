// Utils
import { valuesToOptions, isEnum, getEnumTitle } from '@react-jsonschema-form-utils/enum-utils';
import { coerceValue } from '@react-jsonschema-form-utils/parse-values';

// Types
import { JSONSchema7, JSONSchema7Type } from 'json-schema';

type Value = boolean | string | Array<string> | JSONSchema7Type;

export type SelectProps = {
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

const onChangeHandler = (onChange, type, isMultiple) => (e) => {
  const value = isMultiple
    ? e.target?.value?.filter((item) => item)
    : coerceValue(type, e.target.value);
  if (value !== undefined) onChange(value);
};

export default ({ onChange, schema = {}, type, isMultiple }) => ({
  onChange: onChange && onChangeHandler(onChange, type, isMultiple),
  choices: valuesToOptions(isEnum(schema)),
  nullOption: 'Please select...',
  label: getEnumTitle(schema),
});
