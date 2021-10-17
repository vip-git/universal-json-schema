// Library
import React from 'react';
import { View } from 'react-native';
import { TextInput, Checkbox } from 'react-native-paper';

// Types
import { UIFramework } from './types/rnpaper-framework.type';

export const uiFramework: UIFramework = {
  name: 'ReactNativePaper',
  platform: 'mobile',
  internal: {
    CrossPlatformWrapper: () => (<View />),
    CrossPlatformLoadingWrapper: () => (<View />),
    FormButtons: () => (<View />),
    ValidationMessages: () => (<View />),
  },
  wrapperComponents: {
    InputLabel: () => (<View />),
    FormLabel: () => (<View />),
    AppBar: () => (<View />),
    Tabs: () => (<View />),
    Tab: () => (<View />),
    Box: () => (<View />),
    CircularProgress: () => (<View />),
    Typography: () => (<View />),
    Divider: () => (<View />),
    IconButton: () => (<View />),
    AddCircle: () => (<View />),
    Stepper: () => (<View />),
    Step: () => (<View />),
    StepLabel: () => (<View />),
    Button: () => (<View />),
    ArrowUpward: () => (<View />),
    ArrowDownward: () => (<View />),
    RemoveCircle: () => (<View />),
    FormControl: () => (<View />),
    FormGroup: () => (<View />),
    FormHelperText: () => (<View />),
    ActiveComp: () => (<View />),
    Div: () => (<View />),
    FieldsetHTML: () => (<View />),
    Para: () => (<View />)
  },
  components: {
    string: {
      Input: TextInput,
    },
    array: {
      select: TextInput,
    },
    boolean: {
      checkbox: Checkbox,
    },
    null: {
      emptyDiv: View,
    },
  },
  styles: {
    FieldSetStyles: () => {},
    FormFieldStyles: () => {},
    FormStyles: () => {},
    defaultTheme: () => {},
    FieldStyles: () => {},
    FormStepperStyles: () => {}
  }
}
