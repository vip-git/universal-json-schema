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
  },
};

export default createMuiTheme(theme);
