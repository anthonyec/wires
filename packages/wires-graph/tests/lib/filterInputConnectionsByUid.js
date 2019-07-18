import assert from 'assert';

import filterInputConnectionsByUid from '../../src/lib/filterInputConnectionsByUid';

describe.only('filterInputConnectionsByUid', () => {
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
        from: { uid: 'Process_2', prop: 'out1' },
        to: { uid: 'Process_3', prop: 'in1' }
      }
    ];

    const result = filterInputConnectionsByUid(connections, 'Process_3');

    assert.deepStrictEqual(result, expected);
  });
});
