// Context
import { EventContext } from '../../Form';

export default ({
  schema = {},
  uiSchema = {},
  isCustomComponent,
  inputValue,
  onChange,
  onKeyDown,
  creatableSelectValue,
  onCreatableSelectChange,
  onInputChange,
  htmlid,
  data,
  objectData,
}) => {
  const widget = uiSchema['ui:widget'];
  const options = uiSchema['ui:options'] || uiSchema['ui:props'] || {};
  const { type } = schema;
  const rv = isCustomComponent
    ? {
      onKeyDown,
      ...isCustomComponent({ onChange }).props,
      ...options,
    }
    : {
      onChange,
      onKeyDown,
      uiSchema,
      schema,
      options,
      widget,
      type,
      EventContext,
      htmlid,
    };

  if (
    isCustomComponent
    && isCustomComponent({ onChange })
    && isCustomComponent({ onChange }).props
    && isCustomComponent({ onChange }).props.onChange
  ) {
    rv.onChange = isCustomComponent({ onChange }).props.onChange;
  }
  else if (options.disabled) {
    if (typeof options.disabled === 'boolean') {
      rv.disabled = options.disabled;
    }
    else if (typeof options.disabled === 'function') {
      rv.disabled = options.disabled.call(null, data, objectData);
    }
  }

  return rv;
};
