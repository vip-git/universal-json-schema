export type GetComponent = {
    schema: any;
    uiSchema: any;
    components?: Array<any>;
    schemaVersion?: string;
    required?: Array<string>; 
    path?: string;
    htmlid?: string;
    onChange?: Function;
}
