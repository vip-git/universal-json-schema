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
  },
  components: {
    string: {
      input: TextInput,
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
};
