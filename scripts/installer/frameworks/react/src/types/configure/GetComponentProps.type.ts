import { ReactElement } from 'react';

export type GetComponentProps = {
    schema: any;
    uiSchema?: any;
    xhrSchema?: any;
    isCustomComponent?: (props: any) => ReactElement;
    inputValue?: string;
    onChange?: Function;
    onXHRSchemaEvent?: Function;
    onKeyDown?: Function;
    creatableSelectValue?: string;
    onCreatableSelectChange?: Function;
    onInputChange?: Function;
    htmlid?: string;
    data?: any;
    objectData?: any;
    dynamicKeyField?: string;
    required?: Array<string>;
    path?: string;
    interceptors?: any;
};
