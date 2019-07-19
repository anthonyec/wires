import assert from 'assert';

import filterTopProcesses from '../../src/lib/filterTopProcesses';

describe.only('filterTopProcesses', () => {
  it('returns array of UIDs of top process', () => {
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
      },
      {
        from: { uid: 'Process_4', prop: 'out1' },
        to: { uid: 'Process_3', prop: 'in1' }
      }
    ];
    const expected = ['Process_1', 'Process_4'];
    const uids = filterTopProcesses(connections);

    assert.deepStrictEqual(uids, expected);
  });
});
