import assert from 'assert';

import uidGenerator from '../../src/lib/uidGenerator';

describe.only('uidGenerator', () => {
  it('creates getUid function', () => {
    const getUid = uidGenerator();

    assert.strictEqual(typeof getUid, 'function');
  });

  describe('getUid', () => {
    it('returns correct uid when name is passed into it', () => {
      const getUid = uidGenerator();
      const uid = getUid('name');
      const expected = 'name_1';

      assert.strictEqual(uid, expected);
    });

    it('returns blank uid when no name is passed into it', () => {
      const getUid = uidGenerator();
      const uid = getUid();
      const expected = '_1';

      assert.strictEqual(uid, expected);
    });

    it('returns incremented uid when the same name is passed in twice', () => {
      const getUid = uidGenerator();

      getUid('name');

      const uid = getUid('name');
      const expected = 'name_2';

      assert.strictEqual(uid, expected);
    });

    it('returns uid that isn\'t incremented when a different name is passed', () => {
      const getUid = uidGenerator();

      getUid('name');
      getUid('name');

      const uid = getUid('otherName');
      const expected = 'otherName_1';

      assert.strictEqual(uid, expected);
    });
  });
});
