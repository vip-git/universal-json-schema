interface Library {
    // Frameworks
    React?: Promise<any>;
    Angular?: Promise<any>;
    ReactNative?: Promise<any>;
    NativeScript?: Promise<any>;
    Ionic?: Promise<any>;
    Stencil?: Promise<any>;
    Vue?: Promise<any>;

    // Util Libs
    nanoId?: Function;
}

interface Components {
    // Mandatory components for every UIFramework
    string: {
        input: Promise<any>;

        // Optional Components
        select?: Promise<any>;
        radioGroup?: Promise<any>;
        autoComplete?: Promise<any>;
        picker?: Promise<any>;
        upload?: Promise<any>;
        richTextEditor?: Promise<any>;
        ratings?: Promise<any>;
    },
    null: {
        emptyDiv: Promise<any>;
    },
    array: {
        select: Promise<any>;

        // Optional Components
        autoComplete?: Promise<any>;
        
        // React Specific Components
        creatableSelect?: Promise<any>;
        reactSelect?: Promise<any>;
    },
    boolean: {
        checkbox: Promise<any>;

        // Optional Components
        switch?: Promise<any>;
    },
}

interface Parsers {
    enumUtils?: Promise<any>;
    parseValues?: Promise<any>;
}

interface Interceptors {
    translateRatings?: Promise<any>;
    translateCurrency?: Promise<any>;
    translateRangeDate?: Promise<any>;
}

type UIFrameworkNames = 'MaterialUI' | 'SemanticUI' | 'BootstrapUI' | 'FluentUI' | 'ReactNativePaperUI' | 'Ionic';
type UIFrameworkPlatforms = 'web' | 'mobile' | 'desktop';

interface UIFramework {
    name: UIFrameworkNames;
    platform: UIFrameworkPlatforms;
    components: Components;
}

export interface UniversalSchemaFramework {
    library: Library;
    parsers: Parsers;
    interceptors: Interceptors;
    uiFramework: UIFramework;
}
