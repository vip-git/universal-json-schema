import { createTheme } from '@mui/material/styles';
import teal from '@mui/material/colors/teal';
import red from '@mui/material/colors/red';
import blue from '@mui/material/colors/lightBlue';

const theme = {
  palette: {
    primary: {
      main: blue[600],
      contrastText: '#ffff',
    },
    secondary: teal,
    error: red,
  },
  components: {
    // Name of the component
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        variant: 'standard',
      },
    },
  },
  overrides: {
    MuiInput: {
      root: {
        fontSize: 'inherit',
      },
    },
    MuiSelect: {
      outlined: {
        color: '#ffff',
      },
    },
    MuiTab: {
      wrapper: {
        minWidth: 120,
      },
    },
  },
};

export default createTheme(theme);
