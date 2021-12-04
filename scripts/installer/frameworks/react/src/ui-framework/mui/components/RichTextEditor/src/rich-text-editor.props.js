// Library
import { serializer } from './lib/RichText';

const onChangeHandler = (onChange) => (e) => {
  const value = serializer.serialize(e);
  if (value !== undefined) onChange(value);
};

export default ({ onChange }) => ({
  onChange: onChange && onChangeHandler(onChange),
});
