// imports
import translateRangeDate from '..';

describe('translateRangeDate', () => {
    it('returns formatted date with original value', () => {
      const data = {
        startDate: '05 October 2011 14:48 UTC',
        endDate: '06 October 2011 14:48 UTC'
      };
      const expected = {
        'formData': {
          'endDate': '2011-10-06T14:48:00.000Z',
          'startDate': '2011-10-05T14:48:00.000Z',
        },
        'uiData': '10/5/2011 - 10/6/2011',
      };
      const actual = translateRangeDate({
          data,
          options: {
            useLocaleString: 'us'
          }
      });
      expect(actual).toStrictEqual(expected);
    });
});