// Import
import useFormActions from '../form.actions';

describe('useFormActions', () => {
    it('Should be able to execute Form Actions', () => {
        const onChange = jest.fn();
        const { executeFormActions } = useFormActions({ isPartialUI: false });
        const { callOnChange } = executeFormActions({ buttonDisabled: false });
        callOnChange({
            state: {
                context: {
                    formSchema: {},
                    formData: {},
                    uiData: {},
                    uiSchema: {},
                    formSchemaXHR: {},
                    validations: [],
                    activeStep: 1,
                    hasError: false,
                    effects: {
                        onChange,
                    }
                }
            }
        } as any);
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('Should be able to Update Error Field', () => {
        const onChange = jest.fn();
        const isPartialUI = jest.fn()
        const { getValidActionToExecute } = useFormActions({ isPartialUI });
        const expected = ['callOnChange', 'enableFormSubmit'];
        const expectedError = ['enableFormSubmit'];
        expect(getValidActionToExecute({ 
            value: { formUI: 'test' },
            history: {},
            hasTag: {},
            historyValue: {},
            actions: { type: 'e' },
            event: { type: 'updateTabIndex' },
            activities: {},
            context: {
                formSchema: {},
                formData: {},
                uiData: {},
                uiSchema: {},
                formSchemaXHR: {},
                validations: [],
                activeStep: 1,
                hasError: false,
                effects: {
                    onChange,
                }
            }
        } as any)).toStrictEqual(expected);
        expect(getValidActionToExecute({ 
            value: { formUI: 'test' },
            history: {},
            hasTag: {},
            historyValue: {},
            actions: { type: 'e' },
            event: { type: 'updateFormOnXHRComplete' },
            activities: {},
            context: {
                formSchema: {},
                formData: {},
                uiData: {},
                uiSchema: {},
                formSchemaXHR: {},
                validations: [],
                activeStep: 1,
                hasError: false,
                effects: {
                    onChange,
                }
            }
        } as any)).toStrictEqual(expected);
        expect(getValidActionToExecute({ 
            value: { formUI: 'test' },
            history: {},
            hasTag: {},
            historyValue: {},
            actions: { type: 'e' },
            event: { type: 'error' },
            activities: {},
            context: {
                formSchema: {},
                formData: {},
                uiData: {},
                uiSchema: {},
                formSchemaXHR: {},
                validations: [],
                activeStep: 1,
                hasError: false,
                effects: {
                    onChange,
                }
            }
        } as any)).toStrictEqual(expectedError);
    });
});
