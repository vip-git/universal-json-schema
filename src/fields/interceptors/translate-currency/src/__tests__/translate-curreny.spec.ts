// imports
import translateCurrency from '..';

describe('translateCurrency', () => {
    it('returns formatted currency with original value', () => {
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
});