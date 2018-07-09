import React from 'react';
import 'typeface-roboto'; // eslint-disable-line import/extensions
import CssBaseline from 'material-ui/CssBaseline';

import { MuiThemeProvider } from 'material-ui/styles';
import theme from './theme';

export default ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);
