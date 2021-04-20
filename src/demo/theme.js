import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/lightBlue';

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
    }
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

export default createMuiTheme(theme);
