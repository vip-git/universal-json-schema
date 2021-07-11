// imports
import translateCurrency from '..';

describe('translateCurrency', () => {
    it('returns formatted currency with original value (us)', () => {
      const value = '121231.23';
      const expected = {
        'formData': 121231.23, 
        'uiData': '121,231.23'
      };
      const actual = translateCurrency({
          value,
          options: {
            useLocaleString: 'us'
          }
      });
      expect(actual).toStrictEqual(expected);
    });

    it('returns formatted currency with original value (fr)', () => {
      const value = '121231,23';
      const expected = {
        'formData': 121231.23, 
        'uiData': '121 231,23'
      };
      const actual = translateCurrency({
          value,
          options: {
            useLocaleString: 'fr'
          }
      });
      expect(actual).toStrictEqual(expected);
    });

    it('returns formatted currency with original value (de)', () => {
      const value = '121231,23';
      const expected = {
        'formData': 121231.23, 
        'uiData': '121.231,23'
      };
      const actual = translateCurrency({
          value,
          options: {
            useLocaleString: 'de'
          }
      });
      expect(actual).toStrictEqual(expected);
    });
});