import { 
  State, 
} from 'xstate';
  
export type StateMachineInstance = State<Record<string, any>, any, any, {
    value: any;
    context: Record<string, any>;
  }> & { value: { formUI: string } };
export interface FormContext {
    uiSchema: any;
    formSchema: any;
    xhrSchema: any;
    formData: any;
    uiData: any;
    validation: any;
    effects: any;
    activeStep: number;
    lastField: string;
    xhrProgress: {
      [key: string]: boolean;
    };
}
