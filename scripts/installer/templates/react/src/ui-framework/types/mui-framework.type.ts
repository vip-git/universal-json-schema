type UIFrameworkNames = 'MaterialUI';
type UIFrameworkPlatforms = 'web';

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

export interface UIFramework {
    name: UIFrameworkNames;
    platform: UIFrameworkPlatforms;
    components: Components;
}