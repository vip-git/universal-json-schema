// Material UI
import { makeStyles, createStyles } from '@mui/styles';

export const defaultTheme: any = {
  palette: {
    primary: {
      main: '#039be5',
      contrastText: '#ffff',
    },
    secondary: {
      50: '#e0f2f1',
      100: '#b2dfdb',
      200: '#80cbc4',
      300: '#4db6ac',
      400: '#26a69a',
      500: '#009688',
      600: '#00897b',
      700: '#00796b',
      800: '#00695c',
      900: '#004d40',
      A100: '#a7ffeb',
      A200: '#64ffda',
      A400: '#1de9b6',
      A700: '#00bfa5',
    },
    error: {
      50: '#ffebee',
      100: '#ffcdd2',
      200: '#ef9a9a',
      300: '#e57373',
      400: '#ef5350',
      500: '#f44336',
      600: '#e53935',
      700: '#d32f2f',
      800: '#c62828',
      900: '#b71c1c',
      A100: '#ff8a80',
      A200: '#ff5252',
      A400: '#ff1744',
      A700: '#d50000',
    },
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

export default makeStyles(() => createStyles({
  root: {
    'padding': 30,
    '&:focus': {
      outline: 'none',
    },
  },
  formButtons: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  submit: {
    fontSize: '100%',
  },
  cancel: {
    fontSize: '100%',
    marginRight: 15,
  },
  button: {
    fontSize: '100%',
  },
}),
);
