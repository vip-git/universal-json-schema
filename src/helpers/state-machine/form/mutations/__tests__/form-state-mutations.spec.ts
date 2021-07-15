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
              onChange: jest.fn(),
              onError: jest.fn(),
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
            stateMachineService.send('update', {
                field: 'test',
                givenValue: 'test-2'
            });
        });
    });
});
