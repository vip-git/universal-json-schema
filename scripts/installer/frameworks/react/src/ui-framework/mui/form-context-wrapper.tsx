// Library
import React from 'react';

// Context
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const LocalizationProviderContext: any = LocalizationProvider;

const FormContextWrapper = ({
    RenderFormButtons,
    children, 
    actionButtonPos, 
    hasPageLayoutSteps, 
    isFormLoading
}) => (
    <>
        {
            !isFormLoading && (actionButtonPos === 'top' && !hasPageLayoutSteps) && (
                <RenderFormButtons />
            )
        }
        <LocalizationProviderContext dateAdapter={AdapterMoment}>
            {children}
        </LocalizationProviderContext>
        {
            !isFormLoading && (!actionButtonPos && !hasPageLayoutSteps) && (
                <RenderFormButtons />
            )
        }
    </>
)

export default FormContextWrapper;
