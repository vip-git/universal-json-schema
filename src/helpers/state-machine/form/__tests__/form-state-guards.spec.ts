// Import
import GUARDS from '../form-state.guards';

describe('Form State Guards', () => {
    it('Should be able to Update Field', () => {
        const fieldStates = GUARDS.isUpdatedField('test')({}, {
            field: 'test',
            givenValue: 'hello'
        }, {});
        const expected = 'true';
        expect(JSON.stringify(fieldStates)).toBe(expected);
    });

    it('Should be able to Update Error Field', () => {
        const fieldStates = GUARDS.isUpdatedErrorField('test')({}, {
            dataPath: 'test',
            params: { missingProperty: 'hello' }
        });
        const expected = 'false';
        expect(JSON.stringify(fieldStates)).toBe(expected);
    });
});
