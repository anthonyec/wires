import assert from 'assert';

import mapPropsWithValues from '../../src/lib/mapPropsWithValues';

describe('mapPropsWithValues', () => {
  it('returns object with prop values mapped to mapping keys', () => {
    const props = {
      a: 1,
      b: 2,
      c: 3
    };
    const mapping = {
      'x': 'a',
      'y': 'b',
      'z': 'c'
    };
    const expected = {
      x: 1,
      y: 2,
      z: 3
    };

    const result = mapPropsWithValues(props, mapping);

    assert.deepStrictEqual(result, expected);
  });

  it('returns object with value missing if mapping does not exist for key', () => {
    const props = {
      a: 1,
      b: 2,
      c: 3
    };
    const mapping = {
      'x': 'a',
      'z': 'c'
    };
    const expected = {
      x: 1,
      z: 3
    };

    const result = mapPropsWithValues(props, mapping);

    assert.deepStrictEqual(result, expected);
  });

  it('ignores mapping keys if the prop key does not exist', () => {
    const props = {
      a: 1,
      c: 3
    };
    const mapping = {
      x: 'a',
      y: 'b',
      z: 'c',
    };
    const expected = {
      x: 1,
      z: 3
    };

    const result = mapPropsWithValues(props, mapping);

    assert.deepStrictEqual(result, expected);
  });

  it('returns empty object if empty mapping is provided', () => {
    const props = {
      a: 1,
      c: 3
    };
    const expected = {};

    const result = mapPropsWithValues(props, {});

    assert.deepStrictEqual(result, expected);
  });

  it('returns empty object if empty props is provided', () => {
    const mapping = {
      x: 'a',
      y: 'b',
      z: 'c',
    };
    const expected = {};

    const result = mapPropsWithValues({}, mapping);

    assert.deepStrictEqual(result, expected);
  });
});
