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
        InputLabel: (props: any) => ReactElement;
        FormLabel: (props: any) => ReactElement;
        AppBar: (props: any) => ReactElement;
        Tabs: (props: any) => ReactElement;
        Tab: (props: any) => ReactElement;
        Box: (props: any) => ReactElement;
        CircularProgress: (props: any) => ReactElement;
        Typography: (props: any) => ReactElement;
        Divider: (props: any) => ReactElement;
        IconButton: (props: any) => ReactElement;
        AddCircle: (props: any) => ReactElement;
        Stepper: (props: any) => ReactElement;
        Step: (props: any) => ReactElement;
        StepLabel: (props: any) => ReactElement;
        Button: (props: any) => ReactElement;
        ArrowUpward: (props: any) => ReactElement;
        ArrowDownward: (props: any) => ReactElement;
        RemoveCircle: (props: any) => ReactElement;
        FormControl: (props: any) => ReactElement;
        FormGroup: (props: any) => ReactElement;
        FormHelperText: (props: any) => ReactElement;
        ActiveComp: (props: any) => ReactElement;
        Span: FunctionComponent<{ className?: any; style?: React.CSSProperties; }>;
        Div: FunctionComponent<{ className?: any; style?: React.CSSProperties; }>;
        FieldsetHTML: FunctionComponent<{ className: any; }>;
        Para: FunctionComponent<{ className: any; }>;
    };
    styles: {
        FieldSetStyles: {
            fieldSetContent: () => ({
                root: string;
            });
            fieldSet: () => ({
                root: string;
                listItem: string;
            });
            reorderControls: () => ({
                root: string;
            }),
            fieldSetObject: () => ({
                root: string;
                row: string;
                addItemBtn: string;
            }),
        };
        FormFieldStyles: () => ({
            root: string;
        });
        FormStyles: () => ({
            root: string;
        });
        defaultTheme: any;
        FieldStyles: () => {
            root: string;
            radioLabel: string;
            normalLabel: string;
            withLabel: string;
            customLabel: string;
            description: string;
        };
        FormStepperStyles: Function;
    };
}