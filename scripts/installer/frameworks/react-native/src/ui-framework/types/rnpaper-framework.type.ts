type UIFrameworkNames = 'ReactNativePaper';
type UIFrameworkPlatforms = 'mobile';

interface Components {
    // Mandatory components for every UIFramework
    string: {
        input: Function;

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
    internal: any;
}