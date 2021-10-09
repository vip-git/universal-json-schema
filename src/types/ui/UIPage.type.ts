import { CSSProperties } from 'react';

export type UILayoutTabs = 'tabs';
export type UILayoutSteps = 'steps';
export type UIPageProps = {
    'ui:schemaErrors'?: boolean;
};

export type UISchemaPageType = {
    'ui:layout': UILayoutTabs | UILayoutSteps;
    'props'?: UIPageProps;
    'style'?: CSSProperties;
    'tabs'?: {
        'style': CSSProperties;
    },
    'tab'?: {
        'style': CSSProperties;
    }
};
