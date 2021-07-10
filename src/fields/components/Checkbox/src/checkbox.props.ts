// Utils
import { valuesToOptions, isEnum } from '@react-jsonschema-form-utils/enum-utils';

// Types
import { JSONSchema7, JSONSchema7Type } from 'json-schema';

type Value = boolean | string | Array<string> | JSONSchema7Type;

export type CheckBoxProps = {
  value?: Value;
  type?: string;
  onChange?: Function;
  schema?: JSONSchema7 & { parsedArray?: boolean };
  options?: any;
  [key: string]: any;
};

const doOnChange = (onChange) => (e, checked) => onChange(checked);

// const parseMultiSelectValue = (givenValue) => (Array.isArray(givenValue) ? givenValue : [givenValue]);

const onCheckboxChangeHandler = (givenOnChange, value, schema, allValues, adds) => (e, checked) => {
  if (checked) {
    const finalValues = Array.isArray(allValues) ? [...allValues, value] : [value];
    givenOnChange(finalValues, adds);
  }
  else {
    const finalValues = allValues.filter((ev) => ev !== value);
    givenOnChange(finalValues);
  }
};

const onEnumChangeHandler = (givenOnChange, value, adds) => (
  e,
  checked,
) => {
  if (checked) {
    givenOnChange(value, adds);
  } 
  else {
    givenOnChange('');
  }
};

export default ({ 
  onChange,
  schema = {},
  value,
}:{
  onChange: Function, 
  schema: JSONSchema7 & { parsedArray?: boolean }; 
  value: Value;
}) => ({
  onChange: doOnChange(onChange),
  onEnumChange: (givenValue, adds) => onChange && onEnumChangeHandler(onChange, givenValue, adds),
  onGroupChange: (givenValue, adds) => onChange && onCheckboxChangeHandler(onChange, givenValue, schema, value, adds),
  label: schema.title,
  choices: valuesToOptions(isEnum(schema)),
});
