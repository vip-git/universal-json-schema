import { ReactElement } from 'react';

export type ConfiguredFieldProps = {
    data: any;
    type: string;
    descriptionText: string;
    activeCompColor: string;
    helpText: string;
    Component: (props: any) => ReactElement;
    LabelComponent: (props: any) => ReactElement;
    labelComponentProps: any;
    title: string;
    className: string;
    componentProps: any;
    id: string;
    htmlid: string;
    isHidden: boolean;
    isCustomComponent: boolean;
    hasError: boolean;
    hasInlineError: boolean;
};
