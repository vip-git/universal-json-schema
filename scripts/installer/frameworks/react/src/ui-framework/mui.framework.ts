import { UIFramework } from './types/mui-framework.type';

// Material UI
import CrossPlatformWrapper from './mui/platform-wrapper';
import CrossPlatformLoadingWrapper from './mui/platform-loading-wrapper';
import FormButtons from './mui/form-buttons';
import ValidationMessages from './mui/validation-messages';

// Form Components
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import EmptyDiv from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';

// MUI
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

// Icons
import IconButton from '@mui/material/IconButton';
import AddCircle from '@mui/icons-material/AddCircle';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import RemoveCircle from '@mui/icons-material/Close';
import ActiveComp from '@mui/icons-material/FiberManualRecord';

// Styles
import FieldSetStyles from './mui/styles/field-set-styles';
import FormStyles, { defaultTheme } from './mui/styles/form-styles';
import FieldStyles from './mui/styles/field-styles';
import FormFieldStyles from './mui/styles/form-field-styles';
import FormStepperStyles from './mui/styles/form-stepper-styles';

export const uiFramework: UIFramework = {
  name: 'MaterialUI',
  platform: 'web',
  internal: {
    CrossPlatformWrapper,
    CrossPlatformLoadingWrapper,
    FormButtons,
    ValidationMessages,
  },
  wrapperComponents: {
    Typography,
    Divider,
    IconButton,
    AddCircle,
    Stepper,
    Step,
    StepLabel,
    Button,
    ArrowUpward,
    ArrowDownward,
    RemoveCircle,
    FormControl,
    FormGroup,
    FormHelperText,
    ActiveComp,
  },
  styles: {
    FieldSetStyles,
    FormFieldStyles,
    FieldStyles,
    FormStepperStyles,
    FormStyles,
    defaultTheme,
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
