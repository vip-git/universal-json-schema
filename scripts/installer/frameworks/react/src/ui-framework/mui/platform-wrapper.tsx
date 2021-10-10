// Library
import React from 'react';

// Material UI
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// Internal
import FormContextWrapper from './form-wrapper';

const WebWrapper = ({ 
    children, 
    classes, 
    uiSchema, 
    defaultTheme, 
    theme,
    RenderFormButtons,
    actionButtonPos, 
    hasPageLayoutSteps, 
    isFormLoading,
    loadingState,
    activeStep,
    buttonDisabled,
    onUpload,
    hasPageLayoutTabs,
    LoadingContext,
    StepperContext,
    EventContext,
}) => (
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={createTheme(theme ? { ...defaultTheme, ...theme } : defaultTheme)}>
            <Paper className={classes.root} style={uiSchema && uiSchema['ui:page'] ? uiSchema['ui:page'].style : {}}>
                <FormContextWrapper
                    RenderFormButtons={RenderFormButtons}
                    actionButtonPos={actionButtonPos}
                    hasPageLayoutSteps={hasPageLayoutSteps}
                    isFormLoading={isFormLoading}
                    loadingState={loadingState}
                    activeStep={activeStep}
                    buttonDisabled={buttonDisabled}
                    onUpload={onUpload}
                    hasPageLayoutTabs={hasPageLayoutTabs}
                    LoadingContext={LoadingContext}
                    StepperContext={StepperContext}
                    EventContext={EventContext}
                >
                    {children}
                </FormContextWrapper>
            </Paper>
        </ThemeProvider>
    </StyledEngineProvider>
);

export default WebWrapper;
