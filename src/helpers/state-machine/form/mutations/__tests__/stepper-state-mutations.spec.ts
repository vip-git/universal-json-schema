// Import
import StepperMutations from '../stepper-state.mutations';

describe('StepperMutations', () => {
    [
        'updateActiveStep'
    ].forEach((actionName) => {
        it(`Should be able to execute ${actionName}`, () => {
            const fieldStates = StepperMutations[actionName];
            const expected = '{\"type\":\"xstate.assign\",\"assignment\":{}}';
            expect(JSON.stringify(fieldStates)).toBe(expected);
        });
    });
});
