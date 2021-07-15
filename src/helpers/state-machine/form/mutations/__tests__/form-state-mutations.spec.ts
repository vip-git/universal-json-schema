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
        });
        it('updateXHRData', () => {
            const updateMutation = stateMachineService.send('updateFormOnXHRComplete', {
                formSchema: {
                    'new': 'info'
                },
                formSchemaXHR: {
                    'new': 'info'
                },
                formData: {},
                uiData: {}
            });
            const contextMutations = JSON.parse(JSON.stringify(updateMutation.context));
            delete contextMutations.effects;
            const expected = {"activeStep": 0, "formData": {"test": "test-2"}, "formSchema": {}, "formSchemaXHR": {"new": "info"}, "hasError": false, "hasXHRError": false, "lastField": "test", "parsedFormSchema": {}, "uiData": {}, "uiSchema": {}, "validation": {}, "validations": {}, "xhrProgress": {"undefined": false}, "xhrSchema": {}};
            expect(contextMutations).toStrictEqual(expected);
        });

        it('updateXHRData (edge case)', () => {
            const updateMutation = stateMachineService.send('updateFormOnXHRComplete', {});
            const contextMutations = JSON.parse(JSON.stringify(updateMutation.context));
            delete contextMutations.effects;
            const expected = {"activeStep": 0, "formData": {"test": "test-2"}, "formSchema": {}, "formSchemaXHR": {"new": "info"}, "hasError": false, "hasXHRError": false, "lastField": "test", "parsedFormSchema": {}, "uiData": {}, "uiSchema": {}, "validation": {}, "validations": {}, "xhrProgress": {"undefined": false}, "xhrSchema": {}};
            expect(contextMutations).toStrictEqual(expected);
        });
    });
});
