import React from 'react';
import 'typeface-roboto'; // eslint-disable-line import/extensions
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/styles';
import theme from './theme';

export default ({ children }) => (
  <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
  </ThemeProvider>
);
