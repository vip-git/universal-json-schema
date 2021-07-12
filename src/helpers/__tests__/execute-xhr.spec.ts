import executeXHRCall from '../execute-xhr-call';

describe('executeXHRCall', () => {
  it('can execute initial call', async () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    // assemble
    const data = {
      type: 'load',
      url: 'https://asdasd',
      method: 'GET',
      payload: [],
      onSuccess,
      onFailure,
    };
    const expected = undefined;

    // act
    const actual = await executeXHRCall(data);

    // assert
    expect(actual).toEqual(expected);
    expect(onFailure).toHaveBeenCalledTimes(1);
  });
  it('can execute initial call (POST)', async () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    // assemble
    const data = {
      type: 'load',
      url: 'https://asdasd',
      method: 'POST',
      payload: [],
      onSuccess,
      onFailure,
    };
    const expected = undefined;

    // act
    const actual = await executeXHRCall(data);

    // assert
    expect(actual).toEqual(expected);
    expect(onFailure).toHaveBeenCalledTimes(1);
  });
});
