// Material UI
import { ThemeOptions } from '@mui/material/styles';
import { UISchemaType } from './UISchema.type';

export type FormProps = {
    theme?: ThemeOptions;
    formData: any;
    schema: any;
    xhrSchema: any;
    uiSchema: UISchemaType<{}>;
    validations: any;
    prefixId: any;
    submitOnEnter: any;
    onChange: any;
    onUpload: any;
    onSubmit: any;
    onStepNext: any;
    onStepBack: any;
    onStepSkip: any;
    onStepReset: any;
    formButtons: any;
    actionButtonPos: any;
    onCancel: any; 
    activityIndicatorEnabled: any;
    submitValue: any;
    cancelValue: any;
    inProgressValue: any;
    disabled: any; 
    cancelVariant: any;
    submitVariant: any;
    onError: any;
    interceptors: any;
}
