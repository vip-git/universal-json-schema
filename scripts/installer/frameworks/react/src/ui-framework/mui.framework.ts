import { UIFramework } from './types/mui-framework.type';

// Material UI
import CrossPlatformWrapper from './mui/platform-wrapper';
import CrossPlatformLoadingWrapper from './mui/platform-loading-wrapper';
import FormButtons from './mui/form-buttons';

// Form Components
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import EmptyDiv from '@mui/material/Divider';

export const uiFramework: UIFramework = {
  name: 'MaterialUI',
  platform: 'web',
  internal: {
    CrossPlatformWrapper,
    CrossPlatformLoadingWrapper,
    FormButtons,
  },
  components: {
    string: {
      Input,
    },
    array: {
      Select,
    },
    boolean: {
      Checkbox,
    },
    null: {
      EmptyDiv,
    },
  },
};
