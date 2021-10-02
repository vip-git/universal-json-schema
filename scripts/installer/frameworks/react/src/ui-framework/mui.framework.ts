import { UIFramework } from './types/mui-framework.type';

export const uiFramework: UIFramework = {
  name: 'MaterialUI',
  platform: 'web',
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
