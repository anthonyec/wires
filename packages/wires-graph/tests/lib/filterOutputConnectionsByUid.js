import assert from 'assert';

import filterOutputConnectionsByUid from '../../src/lib/filterOutputConnectionsByUid';

describe('filterOutputConnectionsByUid', () => {
  it('returns filtered connections by uid', () => {
    const connections = [
      {
        from: { uid: 'Process_1', prop: 'out1' },
        to: { uid: 'Process_2', prop: 'in1' }
      },
      {
        from: { uid: 'Process_1', prop: 'out2' },
        to: { uid: 'Process_2', prop: 'in2' }
      },
      {
        from: { uid: 'Process_2', prop: 'out1' },
        to: { uid: 'Process_3', prop: 'in1' }
      }
    ];
    const expected = [
      {
        from: { uid: 'Process_1', prop: 'out1' },
        to: { uid: 'Process_2', prop: 'in1' }
      },
      {
        from: { uid: 'Process_1', prop: 'out2' },
        to: { uid: 'Process_2', prop: 'in2' }
      }
    ];

    const result = filterOutputConnectionsByUid(connections, 'Process_1');

    assert.deepStrictEqual(result, expected);
  });
});
