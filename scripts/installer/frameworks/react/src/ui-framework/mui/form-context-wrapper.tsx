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
    isFormLoading
}) => (<>
{
!isFormLoading && (actionButtonPos === 'top' && !hasPageLayoutSteps) && (
    <RenderFormButtons />
)
}
<LocalizationProvider dateAdapter={AdapterMoment}>
    {children}
</LocalizationProvider>
{
!isFormLoading && (!actionButtonPos && !hasPageLayoutSteps) && (
    <RenderFormButtons />
)
}
</>)

export default FormContextWrapper;
