// Library
import React from 'react';

// Context
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CircularProgress from '@mui/material/CircularProgress';

const FormContextWrapper = ({
    RenderFormButtons,
    children, 
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
}) => (<>
{
!isFormLoading && (actionButtonPos === 'top' && !hasPageLayoutSteps) && (
    <RenderFormButtons />
)
}
<LocalizationProvider dateAdapter={AdapterMoment}>
    <LoadingContext.Provider value={loadingState}>
        <StepperContext.Provider value={[activeStep, buttonDisabled] as any}>
        <EventContext.Provider value={onUpload}>
            {
                 isFormLoading && !hasPageLayoutTabs ? (
                    <div> 
                      <CircularProgress disableShrink />
                    </div>
                ) : {children}
            }
        </EventContext.Provider>
        </StepperContext.Provider>
    </LoadingContext.Provider>
</LocalizationProvider>
{
!isFormLoading && (!actionButtonPos && !hasPageLayoutSteps) && (
    <RenderFormButtons />
)
}
</>)

export default FormContextWrapper;
