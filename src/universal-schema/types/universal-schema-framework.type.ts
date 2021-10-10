import { uiFramework } from '@framework/ui-framework';

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
interface Parsers {
    enumUtils?: Promise<any>;
    parseValues?: Promise<any>;
}

interface Interceptors {
    translateRatings?: Promise<any>;
    translateCurrency?: Promise<any>;
    translateRangeDate?: Promise<any>;
}

export interface UniversalSchemaFramework {
    library: Library;
    parsers: Parsers;
    interceptors: Interceptors;
    uiFramework: typeof uiFramework;
}
