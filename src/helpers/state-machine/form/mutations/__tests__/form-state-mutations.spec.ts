// Library
import { interpret } from 'xstate';
import { renderHook } from '@testing-library/react-hooks';

// Import
import FormMutations from '../form-state.mutations';

// Helpers
import createStateMachine from '../../../create-state-machine';
import useFormActions from '../../actions';

describe('FormMutations', () => {
    [
        'updateData',
        'updateXHRData',
        'updateXHRProgress',
        'updateErrorXHRProgress',
        'updateArrayData',
        'updateErrorData',
        'updateTabIndex'
    ].forEach((actionName) => {
        it(`Should be able to execute ${actionName}`, () => {
            const fieldStates = FormMutations[actionName];
            const expected = '{\"type\":\"xstate.assign\",\"assignment\":{}}';
            expect(JSON.stringify(fieldStates)).toBe(expected);
        });
    });

    describe('All actions in the state machine', () => {
        const onChange = jest.fn();
        const onError = jest.fn();
        const params = {
            uiSchema: {},
            xhrSchema: {},
            formSchema: {},
            formData: {},
            uiData: {},
            validation: {},
            validations: {},
            hasError: false,
            effects: {
              onChange,
              onError,
            },
        };
        const formStateMachine = createStateMachine(params);
        const stateMachineService = interpret(
            formStateMachine, { devTools: process.env.NODE_ENV === 'development' },
        ).onTransition((state: any) => executeFormActionsByState({
            state,
            stateMachineService,
        }));
        const { 
            result: { current: { executeFormActionsByState } },
        } = renderHook(() => useFormActions({
            isPartialUI: () => false,
        }));
        stateMachineService.start();
        it('updateData', () => {
            const updateMutation = stateMachineService.send('update', {
                field: 'test',
                givenValue: 'test-2'
            });
            const contextMutations = JSON.parse(JSON.stringify(updateMutation.context));
            delete contextMutations.effects;
            const expected = {"activeStep": 0, "formData": {"test": "test-2"}, "formSchema": {}, "formSchemaXHR": {}, "hasError": false, "hasXHRError": false, "lastField": "test", "parsedFormSchema": {}, "uiData": {}, "uiSchema": {}, "validation": {}, "validations": {}, "xhrProgress": {}, "xhrSchema": {}}
            expect(contextMutations).toStrictEqual(expected);
            expect(onChange).toHaveBeenCalledTimes(2);
            expect(stateMachineService.state.value).toStrictEqual({"formUI": "dirty"});
        });
        it('updateXHRData', () => {
            const updateFormOnXHRComplete = stateMachineService.send('updateFormOnXHRComplete', {
                formSchema: {
                    'new': 'info'
                },
                formSchemaXHR: {
                    'new': 'info'
                },
                formData: {},
                uiData: {}
            });
            const contextMutations = JSON.parse(JSON.stringify(updateFormOnXHRComplete.context));
            delete contextMutations.effects;
            const expected = {"activeStep": 0, "formData": {"test": "test-2"}, "formSchema": {}, "formSchemaXHR": {"new": "info"}, "hasError": false, "hasXHRError": false, "lastField": "test", "parsedFormSchema": {}, "uiData": {}, "uiSchema": {}, "validation": {}, "validations": {}, "xhrProgress": {"undefined": false}, "xhrSchema": {}};
            expect(contextMutations).toStrictEqual(expected);
            expect(onChange).toHaveBeenCalledTimes(3);
            expect(stateMachineService.state.value).toStrictEqual({"formUI": "dirty"});
        });

        it('updateXHRData (edge case)', () => {
            const updateFormOnXHRComplete = stateMachineService.send('updateFormOnXHRComplete', {});
            const contextMutations = JSON.parse(JSON.stringify(updateFormOnXHRComplete.context));
            delete contextMutations.effects;
            const expected = {"activeStep": 0, "formData": {"test": "test-2"}, "formSchema": {}, "formSchemaXHR": {"new": "info"}, "hasError": false, "hasXHRError": false, "lastField": "test", "parsedFormSchema": {}, "uiData": {}, "uiSchema": {}, "validation": {}, "validations": {}, "xhrProgress": {"undefined": false}, "xhrSchema": {}};
            expect(contextMutations).toStrictEqual(expected);
            expect(onChange).toHaveBeenCalledTimes(4);
            expect(stateMachineService.state.value).toStrictEqual({"formUI": "dirty"});
        });

        it('updateErrorData', () => {
            const noErrors = stateMachineService.send('noErrors', {
                hasError: false,
            });
            const contextMutations = JSON.parse(JSON.stringify(noErrors.context));
            delete contextMutations.effects;
            const expected = {"activeStep": 0, "hasError": false, "formData": {"test": "test-2"}, "formSchema": {}, "formSchemaXHR": {"new": "info"}, "hasXHRError": false, "lastField": "test", "parsedFormSchema": {}, "uiData": {}, "uiSchema": {}, "validations": {}, "xhrProgress": {"undefined": false}, "xhrSchema": {}};
            expect(contextMutations).toStrictEqual(expected);
            expect(onChange).toHaveBeenCalledTimes(4);
            expect(stateMachineService.state.value).toStrictEqual({"formUI": "dirty"});
        });

        it('updateErrorXHRProgress', () => {
            const updateErrorXHRProgress = stateMachineService.send('errorXHRProgress', {
                status: true,
                statusCode: 500,
                formSchema: {
                    'new': 'info'
                },
                formSchemaXHR: {
                    'new': 'info'
                },
                formData: {},
                uiData: {}
            });
            const contextMutations = JSON.parse(JSON.stringify(updateErrorXHRProgress.context));
            delete contextMutations.effects;
            const expected = {"activeStep": 0, "formData": {"test": "test-2"}, "formSchema": {}, "formSchemaXHR": {"new": "info"}, "hasError": false, "hasXHRError": true, "lastField": "test", "parsedFormSchema": {}, "uiData": {}, "uiSchema": {}, "validation": {"xhr": []}, "validations": {}, "xhrProgress": {"undefined": true}, "xhrSchema": {}};
            expect(contextMutations).toStrictEqual(expected);
            expect(onChange).toHaveBeenCalledTimes(5);
            expect(stateMachineService.state.value).toStrictEqual({"formUI": "invalid"});
        });

        it('updateErrorXHRProgress (offline)', () => {
            const updateErrorXHRProgress = stateMachineService.send('errorXHRProgress', {
                status: true,
                statusCode: 999,
                formSchema: {
                    'new': 'info'
                },
                formSchemaXHR: {
                    'new': 'info'
                },
                formData: {},
                uiData: {}
            });
            const contextMutations = JSON.parse(JSON.stringify(updateErrorXHRProgress.context));
            delete contextMutations.effects;
            const expected = {"activeStep": 0, "formData": {"test": "test-2"}, "formSchema": {}, "formSchemaXHR": {"new": "info"}, "hasError": false, "hasXHRError": true, "lastField": "test", "parsedFormSchema": {}, "uiData": {}, "uiSchema": {}, "validation": {"xhr": []}, "validations": {}, "xhrProgress": {"undefined": true}, "xhrSchema": {}};
            expect(contextMutations).toStrictEqual(expected);
            expect(onChange).toHaveBeenCalledTimes(6);
            expect(stateMachineService.state.value).toStrictEqual({"formUI": "invalid"});
        });
    });
});
