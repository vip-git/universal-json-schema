import { InputProps, AutocompleteProps, ButtonProps } from '@mui/material';
import { UIWidgetType } from './ui/UIWidget.type';
import { UISchemaPageType } from './ui/UIPage.type';
import { UISchemaValidations } from './ui/UIValidations.type';

interface UISchemaAutoCompleteProps<T> extends 
Omit<AutocompleteProps<{}, boolean, boolean, false>, 'options' | 'renderInput'> {
  options?: ReadonlyArray<T>; 
  renderInput?: any; 
}

type UISchemaOptions = InputProps 
| UISchemaAutoCompleteProps<{}>
| ButtonProps 
| HTMLInputElement & { isMulti?: boolean; buttonTitle?: string; icon?: string; }

type UISchemaProps = {
    'ui:widget'?: UIWidgetType;
    'ui:autofocus'?: boolean;
    'ui:emptyValue'?: string;
    'ui:isClearable'?: boolean;
    'ui:help'?: string;
    'ui:placeholder'?: string;
    'ui:activeCompColor'?: string;
    'ui:component'?: string;
    'ui:interceptor'?: string;
    'ui:title'?: string;
    'ui:description'?: string;
    'mui:className'?: string;
    'mui:inputProps'?: InputProps;
    'ui:validations'?: UISchemaValidations;
    'ui:options'?: string | UISchemaOptions; // add types
    'ui:props'?: UISchemaOptions;
};

type UISchemaPropsObj = {
  [key: string]: UISchemaProps;
};

export type UISchemaType<T> = {
  [key in keyof T]: UISchemaPropsObj | UISchemaProps | UISchemaPageType;
} & {
  'ui:page'?: UISchemaPageType;
};
