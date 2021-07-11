import executeXHRCall from '../execute-xhr-call';

describe('executeXHRCall', () => {
  it('can execute initial call', async () => {
    // assemble
    const data = {
      type: 'string',
    };
    const expected = false;

    // act
    const actual = await executeXHRCall(data);

    // assert
    expect(actual).toEqual(expected);
  });
});
