import React from 'react';
import 'typeface-roboto'; // eslint-disable-line import/extensions
import CssBaseline from '@material-ui/core/CssBaseline';
// import StyledEngineProvider from '@material-ui/styled-engine'; // For MUI 5
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
/** For MUI 5
 * <StyledEngineProvider injectFirst>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  </StyledEngineProvider>
 */
export default ({ children }) => (
  <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
  </MuiThemeProvider>
);
