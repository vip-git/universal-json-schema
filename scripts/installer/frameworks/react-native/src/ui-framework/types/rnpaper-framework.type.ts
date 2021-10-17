// Types
import { FunctionComponent, ReactElement, JSXElementConstructor } from 'react';

type UIFrameworkNames = 'ReactNativePaper';
type UIFrameworkPlatforms = 'mobile';

interface Components {
    // Mandatory components for every UIFramework
    string: {
        Input: (props: any) => ReactElement<any, string | JSXElementConstructor<any>>;

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
        emptyDiv: Function;
    },
    array: {
        select: Function;

        // Optional Components
        autoComplete?: Function;
        
        // React Specific Components
        creatableSelect?: Function;
        reactSelect?: Function;
    },
    boolean: {
        checkbox: Function;

        // Optional Components
        switch?: Function;
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
        InputLabel: Function;
        FormLabel: Function;
        AppBar: Function;
        Tabs: Function;
        Tab: Function;
        Box: Function;
        CircularProgress: Function;
        Typography: Function;
        Divider: Function;
        IconButton: Function;
        AddCircle: Function;
        Stepper: Function;
        Step: Function;
        StepLabel: Function;
        Button: Function;
        ArrowUpward: Function;
        ArrowDownward: Function;
        RemoveCircle: Function;
        FormControl: Function;
        FormGroup: Function;
        FormHelperText: Function;
        ActiveComp: Function;
        Div: FunctionComponent<{ className?: any; style?: React.CSSProperties; }>;
        FieldsetHTML: FunctionComponent<{ className: any; }>;
        Para: FunctionComponent<{ className: any; }>;
    };
    styles: {
        FieldSetStyles: any;
        FormFieldStyles: Function;
        FormStyles: Function;
        defaultTheme: any;
        FieldStyles: Function;
        FormStepperStyles: Function;
    };
}