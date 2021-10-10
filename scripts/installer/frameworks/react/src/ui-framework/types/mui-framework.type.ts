// Types
import { FunctionComponent } from 'react';

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
    internal: Record<string, FunctionComponent<{
        classes?: any,
        uiSchema?: any,
        defaultTheme?: any, 
        theme?: any,
        RenderFormButtons?: any,
        actionButtonPos?: any,
        hasPageLayoutSteps?: any,
        isFormLoading?: any,
    }>>;
}