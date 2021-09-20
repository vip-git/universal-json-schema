// Library
import React from 'react';
import { mount, shallow } from 'enzyme';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterMoment from '@mui/lab/AdapterMoment';

// Internal
import { defaultTheme } from '../form-styles';

export const mountTheme = ({ component }) => mount(
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={createTheme(defaultTheme)}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                    {component}
            </LocalizationProvider>
        </ThemeProvider>
    </StyledEngineProvider>,
);

export const shallowTheme = ({ component }) => shallow(
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={createTheme(defaultTheme)}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                    {component}
            </LocalizationProvider>
        </ThemeProvider>
    </StyledEngineProvider>,
);
