// Context
import { EventContext } from '../../../Form';

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
  dynamicKeyField,
  interceptors,
}) => {
  const widget = uiSchema['ui:widget'];
  const options = uiSchema['ui:options'] || uiSchema['ui:props'] || {};
  const interceptorFunc = uiSchema['ui:interceptor'] || options.onBeforeChange;
  const { type } = schema;
  const rv = isCustomComponent
    ? {
      onKeyDown,
      ...isCustomComponent({ onChange }).props,
      ...options,
    }
    : {
      onChange: (event, value) => {
        // Call Interceptor if it exists
        if (typeof interceptors[interceptorFunc] === 'function') {
          console.log('interceptors normal about to be called', interceptors);
          const { formData, uiData } = interceptors[interceptorFunc]({
            value,
            options,
          });

          return onChange(event, formData, uiData);
        } 
        return onChange(event, value);
      },
      onKeyDown,
      uiSchema,
      schema,
      options,
      widget,
      type,
      EventContext,
      htmlid,
    };

  if (dynamicKeyField === 'key') {
    rv.onBlur = onChange;
    delete rv.onChange;
  }

  if (
    isCustomComponent
    && isCustomComponent({ onChange })
    && isCustomComponent({ onChange }).props
    && isCustomComponent({ onChange }).props.onChange
  ) {
    rv.onChange = (event, value) => {
      // Call Interceptor if it exists
      console.log('interceptors custom about to be called', interceptors);
      return isCustomComponent({ onChange }).props.onChange(event, value);
    };
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
