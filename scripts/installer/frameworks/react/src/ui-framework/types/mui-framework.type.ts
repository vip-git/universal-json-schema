type UIFrameworkNames = 'MaterialUI';
type UIFrameworkPlatforms = 'web';

interface Components {
    // Mandatory components for every UIFramework
    string: {
        Input: Function;

        // Optional Components
        select?: Function;
        radioGroup?: Function;
        autoComplete?: Function;
        picker?: Function;
        upload?: Function;
        richTextEditor?: Function;
        ratings?: Function;
    },
    null: {
        EmptyDiv: Function;
    },
    array: {
        Select: Function;

        // Optional Components
        autoComplete?: Function;
        
        // React Specific Components
        creatableSelect?: Function;
        reactSelect?: Function;
    },
    boolean: {
        Checkbox: Function;

        // Optional Components
        switch?: Function;
    },
}

export interface UIFramework {
    name: UIFrameworkNames;
    platform: UIFrameworkPlatforms;
    components: Components;
    internal: Record<string, (
        classes: any,
        uiSchema: any,
        defaultTheme: any, 
        theme: any,
        RenderFormButtons: any,
        actionButtonPos: any,
        hasPageLayoutSteps: any,
        isFormLoading: any,
        loadingState: any,
        activeStep: any,
        buttonDisabled: any,
        onUpload: any,
        hasPageLayoutTabs: any,
        LoadingContext: any,
        StepperContext: any,
        EventContext: any
    ) => void>;
}