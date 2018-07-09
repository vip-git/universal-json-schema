/* globals describe,it */
import without from 'lodash/without';
import { expect } from 'chai';
import updateFormData, { addListItem, removeListItem, moveListItem } from './update-form-data';

describe('updateFormData', () => {
  it('updates simple field', () => {
    const initial = {
      name: 'Bob',
    };
    const expected = {
      name: 'Harry',
    };
    expect(updateFormData(initial, 'name', 'Harry')).to.deep.equal(expected);
  });
  it('updates nested field', () => {
    const initial = {
      name: {
        firstName: 'Bob',
      },
    };
    const expected = {
      name: {
        firstName: 'Harry',
      },
    };
    expect(updateFormData(initial, 'name.firstName', 'Harry')).to.deep.equal(expected);
  });
  it('updates index field (object)', () => {
    const initial = {
      list: [{
        name: 'Bob',
      }],
    };
    const expected = {
      list: [{
        name: 'Harry',
      }],
    };
    expect(updateFormData(initial, 'list[0].name', 'Harry')).to.deep.equal(expected);
  });
  it('updates index field (simple)', () => {
    const initial = {
      list: ['Bob'],
    };
    const expected = {
      list: ['Harry'],
    };
    expect(updateFormData(initial, 'list[0]', 'Harry')).to.deep.equal(expected);
  });
  it('updates single field', () => {
    const initial = 'initialValue';
    const expected = 'updatedValue';

    expect(updateFormData(initial, '', 'updatedValue')).to.deep.equal(expected);
  });
  it('removes array item', () => {
    const initial = [
      'one',
      'two',
      'three',
    ];
    const expected = ['one', 'three'];

    expect(updateFormData(initial, '', { $apply: arr => without(arr, 'two') })).to.deep.equal(expected);
  });
  it('adds array item', () => {
    const initial = [
      'one',
      'two',
    ];
    const expected = ['one', 'two', 'three'];

    expect(updateFormData(initial, '', { $push: ['three'] })).to.deep.equal(expected);
  });
  describe('addListItem', () => {
    it('adds list item', () => {
      const initial = {
        listItems: [
          '1',
          '2',
        ],
      };
      const expected = {
        listItems: [
          '1',
          '2',
          '3',
        ],
      };

      expect(addListItem(initial, 'listItems', '3')).to.deep.equal(expected);
    });
    it('adds list item to null list', () => {
      const initial = {
        listItems: null,
      };
      const expected = {
        listItems: [
          '1',
        ],
      };

      expect(addListItem(initial, 'listItems', '1')).to.deep.equal(expected);
    });
    it('adds list item - deep', () => {
      const initial = {
        'myprop': {
          listItems: [
            '1',
            '2',
          ],
        },
      };
      const expected = {
        'myprop': {
          listItems: [
            '1',
            '2',
            '3',
          ],
        },
      };

      expect(addListItem(initial, 'myprop.listItems', '3')).to.deep.equal(expected);
    });
  });
  describe('removeListItem', () => {
    it('remove list item', () => {
      const initial = {
        listItems: [
          '1',
          '2',
          '3',
        ],
      };
      const expected = {
        listItems: [
          '1',
          '3',
        ],
      };

      expect(removeListItem(initial, 'listItems', 1)).to.deep.equal(expected);
    });
    it('remove list item - deep', () => {
      const initial = {
        'myprop': {
          listItems: [
            '1',
            '2',
            '3',
          ],
        },
      };
      const expected = {
        'myprop': {
          listItems: [
            '1',
            '3',
          ],
        },
      };

      expect(removeListItem(initial, 'myprop.listItems', 1)).to.deep.equal(expected);
    });
  });
  describe('moveListItem', () => {
    it('moves list item up', () => {
      const initial = {
        listItems: [
          '1',
          '2',
          '3',
        ],
      };
      const expected = {
        listItems: [
          '2',
          '1',
          '3',
        ],
      };

      expect(moveListItem(initial, 'listItems', 1, -1)).to.deep.equal(expected);
    });
    it('moves list item down', () => {
      const initial = {
        listItems: [
          '1',
          '2',
          '3',
        ],
      };
      const expected = {
        listItems: [
          '2',
          '1',
          '3',
        ],
      };

      expect(moveListItem(initial, 'listItems', 0, 1)).to.deep.equal(expected);
    });
  });
});
