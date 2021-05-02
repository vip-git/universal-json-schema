// Types
import { GetComponent } from '@core-types/configure/GetComponent.type';
import { isEnum } from '@react-jsonschema-form-utils/enum-utils';

const componentConfig = require('../component.config').default;
const {
  APP_CONFIG: {
    COMPONENTS: {
      COMP_CONFIG: {
        V2_DEPRECATED_TYPES,
        V2_DEPRECATED_OPTIONS,
        V2_DEPRECATED_ENUMS,
        V2_DEPRECATED_CREATABLE_ENUMS,
        V2_DEPRECATED_PICKERS,
        V2_DEPRECATED_WIDGET_RADIO,
        V2_DEPRECATED_WIDGET_RANGE,
        V2_DEPRECATED_WIDGET_CHECKBOXES,
        SUPPORTED_TYPES: { STRING },
      },
      ENUM_COMPONENTS,
      V2_PICKER_COMPONENT,
      COMMON_COMPONENTS,
    },
  },
} = require('../../../generated/app.config');

export default ({ 
  schema, 
  uiSchema = {}, 
  components, 
  schemaVersion 
}: GetComponent) => {
  // console.log('getComponent schema: %o, uiSchema: %o', schema, uiSchema);
  const widget = uiSchema['ui:widget'];
  const options = uiSchema['ui:options'];
  const newComponent = uiSchema['ui:component'];
  const { type, component: backwardsCompatibleComponent } = schema;
  const component = backwardsCompatibleComponent || newComponent;
  const dataType = V2_DEPRECATED_TYPES.includes(type) ? STRING : type;
  const getDefaultComponent = (isEnumVal) => (isEnumVal ? 'DEFAULT_ENUM' : 'DEFAULT');
  const transformVersion2FormWidgets = (givenSchema, givenType, widgetString) => {
    if (isEnum(givenSchema) && V2_DEPRECATED_ENUMS.includes(widgetString)) {
      return ENUM_COMPONENTS.REACT_SELECT.name;
    }

    if (
      isEnum(givenSchema)
      && V2_DEPRECATED_CREATABLE_ENUMS.includes(widgetString)
    ) {
      return ENUM_COMPONENTS.CREATABLE_REACT_SELECT.name;
    }

    if (
      V2_DEPRECATED_PICKERS.includes(givenType)
      || V2_DEPRECATED_PICKERS.includes(widgetString)
    ) {
      return V2_PICKER_COMPONENT.MATERIAL_PICKER.name;
    }

    if (V2_DEPRECATED_TYPES.includes(givenType)) {
      return givenType;
    }

    if (V2_DEPRECATED_WIDGET_RADIO === widgetString) {
      return ENUM_COMPONENTS.MATERIAL_RADIO_GROUP.name;
    }

    if (V2_DEPRECATED_WIDGET_CHECKBOXES === widgetString) {
      return ENUM_COMPONENTS.MATERIAL_CHECKBOX.name;
    }
    
    return (
      (V2_DEPRECATED_OPTIONS.includes(options) && options)
      || widgetString
      || getDefaultComponent(isEnum(givenSchema))
    );
  };

  const formWidget = !schemaVersion || String(schemaVersion) === '2'
    ? transformVersion2FormWidgets(schema, type, widget)
    : widget || getDefaultComponent(isEnum(schema));

  try {
    if (
      component
      && components
      && component in components
      && typeof components[component] === 'function'
    ) {
      return components[component];
    }

    const selectedComponent = componentConfig.get(dataType).get(formWidget)
      || componentConfig.get(dataType).get(getDefaultComponent(isEnum(schema)));
      
    if (selectedComponent) {
      return selectedComponent;
    }

    return COMMON_COMPONENTS.NORMAL_INPUT.component;
  }
  catch (err) {
    return COMMON_COMPONENTS.NORMAL_INPUT.component;
  }
};
