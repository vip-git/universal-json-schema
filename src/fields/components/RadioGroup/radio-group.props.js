// Utils
import { valuesToOptions } from '../utils/enum-utils';

const onChangeHandler = (givenOnChange) => (e) => {
  if (e.target.value !== undefined) {
    givenOnChange(e.target.value);
  }
};

export default ({ onChange, options = {}, schema = {} }) => ({
  onChange: onChange && onChangeHandler(onChange),
  row: options.inline,
  label: schema.title,
  choices: valuesToOptions(schema.enum),
});
