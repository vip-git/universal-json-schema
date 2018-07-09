import { createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import red from 'material-ui/colors/red';
import blue from 'material-ui/colors/lightBlue';

const theme = {
  palette: {
    primary: {
      main: blue[600],
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
  },
};

export default createMuiTheme(theme);
