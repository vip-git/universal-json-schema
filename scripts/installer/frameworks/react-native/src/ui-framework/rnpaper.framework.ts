import { UIFramework } from './types/rnpaper-framework.type';

export const uiFramework: UIFramework = {
  name: 'ReactNativePaper',
  platform: 'mobile',
  components: {
    string: {
      input: import('@mui/material/Input'),
    },
    array: {
      select: import('@mui/material/Select'),
    },
    boolean: {
      checkbox: import('@mui/material/Checkbox'),
    },
    null: {
      emptyDiv: import('@mui/material/Divider'),
    },
  },
};
