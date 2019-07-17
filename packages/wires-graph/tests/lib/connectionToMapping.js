import assert from 'assert';

import connectionToMapping from '../../src/lib/connectionToMapping';

describe('connectionToMapping', () => {
  it('returns correct mapping from a connection', () => {
    const connection = {
      from: { uid: 'Process_1', prop: 'out' },
      to: { uid: 'Process_2', prop: 'in1' }
    };
    const expectedMapping = {
      in1: 'out'
    };

    const mapping = connectionToMapping(connection);

    assert.deepStrictEqual(mapping, expectedMapping);
  });
});
