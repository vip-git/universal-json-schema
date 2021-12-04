// Types
import { FunctionComponent, ReactElement, JSXElementConstructor } from 'react';

type UIFrameworkNames = 'MaterialUI';
type UIFrameworkPlatforms = 'web';

interface Components {
    // Mandatory components for every UIFramework
    string: {
        Input: (props: any) => ReactElement<any, string | JSXElementConstructor<any>>;

        // Optional Components
        select?: any;
        radioGroup?: any;
        autoComplete?: any;
        picker?: any;
        upload?: any;
        richTextEditor?: any;
        ratings?: any;
    },
    null: {
        EmptyDiv: any;
    },
    array: {
        Select: any;

        // Optional Components
        autoComplete?: any;
        
        // React Specific Components
        creatableSelect?: any;
        reactSelect?: any;
    },
    boolean: {
        Checkbox: any;

        // Optional Components
        switch?: any;
    },
}

export interface UIFramework {
    name: UIFrameworkNames;
    platform: UIFrameworkPlatforms;
    components: Components;
    internal: {
        CrossPlatformWrapper: FunctionComponent<{
            classes: any,
            uiSchema: any,
            defaultTheme: any, 
            theme: any,
            RenderFormButtons: any,
            actionButtonPos: any,
            hasPageLayoutSteps: any,
            isFormLoading: any,
        }>;
        CrossPlatformLoadingWrapper: FunctionComponent<{}>;
        FormButtons: FunctionComponent<{
            classes: any; 
            onCancel: any; 
            onSubmit: any; 
            submitValue: any; 
            cancelValue: any; 
            inProgressValue: any; 
            disabled: any; 
            cancelVariant: any; 
            submitVariant: any; 
            activityIndicatorEnabled: any; 
            inProgress: any;
        }>;
        ValidationMessages: any;
    };
    wrapperComponents: {
        InputLabel: any;
        FormLabel: any;
        AppBar: any;
        Tabs: any;
        Tab: any;
        Box: any;
        CircularProgress: any;
        Typography: any;
        Divider: any;
        IconButton: any;
        AddCircle: any;
        Stepper: any;
        Step: any;
        StepLabel: any;
        Button: any;
        ArrowUpward: any;
        ArrowDownward: any;
        RemoveCircle: any;
        FormControl: any;
        FormGroup: any;
        FormHelperText: any;
        ActiveComp: any;
        Div: FunctionComponent<{ className?: any; style?: React.CSSProperties; }>;
        Span: FunctionComponent<{ className?: any; style?: React.CSSProperties; }>;
        FieldsetHTML: FunctionComponent<{ className: any; }>;
        Para: FunctionComponent<{ className: any; }>;
    };
    styles: {
        FieldSetStyles: any;
        FormFieldStyles: any;
        FormStyles: any;
        defaultTheme: any;
        FieldStyles: any;
        FormStepperStyles: any;
    };
}