// imports
import translateRatings from '..';

describe('translateRatings', () => {
    it('returns formatted ratings with original value', () => {
      const value = '4.5';
      const expected = {
        'formData': 4.5,
        'uiData': '4.50',
      };
      const actual = translateRatings({
          value,
          options: {}
      });
      expect(actual).toStrictEqual(expected);
    });
});