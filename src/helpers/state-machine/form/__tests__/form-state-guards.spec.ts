// Import
import GUARDS from '../form-state.guards';

describe('Form State Guards', () => {
    it('Should be able to get states', () => {
        const fieldStates = GUARDS.isUpdatedField('test')({}, {
            field: 'test',
            givenValue: 'hello'
        }, {});
        const expected = 'true';
        expect(JSON.stringify(fieldStates)).toBe(expected);
    });
});
