// Library
import React from 'react';
import { mount, shallow } from 'enzyme';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterMoment from '@mui/lab/AdapterMoment';

export const mountTheme = ({ component }) => mount(
    <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider theme={createTheme({})}>
            {component}
        </ThemeProvider>
    </LocalizationProvider>,
);

export const shallowTheme = ({ component }) => shallow(
    <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider theme={createTheme({})}>
            {component}
        </ThemeProvider>
    </LocalizationProvider>,
);
