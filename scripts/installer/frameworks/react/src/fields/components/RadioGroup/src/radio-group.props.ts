// Internal
import { valuesToOptions, isEnum } from '@react-jsonschema-form-utils/enum-utils';
import { coerceValue } from '@react-jsonschema-form-utils/parse-values';

const onChangeHandler = (givenOnChange, schema) => (e) => {
  if (e.target.value !== undefined) {
    const value = coerceValue(schema.type, e.target.value);
    givenOnChange(value);
  }
};

export default ({ onChange, options, schema }: {
  onChange: Function;
  options: any;
  schema: any;
}) => ({
  onChange: onChange && onChangeHandler(onChange, schema),
  row: options.inline,
  label: schema.title,
  choices: valuesToOptions(isEnum(schema)),
});
