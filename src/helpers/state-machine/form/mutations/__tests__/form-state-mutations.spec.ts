// Import
import FormMutations from '../form-state.mutations';

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
});
