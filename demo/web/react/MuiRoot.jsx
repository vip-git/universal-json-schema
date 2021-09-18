import React from 'react';
import 'typeface-roboto'; // eslint-disable-line import/extensions
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import theme from './theme';

export default ({ children }) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  </StyledEngineProvider>
);
