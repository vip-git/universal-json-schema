// Library
import React from 'react';

// Material UI
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// Internal
import FormContextWrapper from './form-context-wrapper';

const WebWrapper = ({ 
    classes, 
    uiSchema, 
    defaultTheme, 
    theme,
    RenderFormButtons,
    actionButtonPos, 
    hasPageLayoutSteps, 
    isFormLoading,
    children,
}) => (
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={createTheme(theme ? { ...defaultTheme, ...theme } : defaultTheme)}>
            <Paper className={classes.root} style={uiSchema && uiSchema['ui:page'] ? uiSchema['ui:page'].style : {}}>
                <FormContextWrapper
                    RenderFormButtons={RenderFormButtons}
                    actionButtonPos={actionButtonPos}
                    hasPageLayoutSteps={hasPageLayoutSteps}
                    isFormLoading={isFormLoading}
                >
                    {children}
                </FormContextWrapper>
            </Paper>
        </ThemeProvider>
    </StyledEngineProvider>
);

export default WebWrapper;
