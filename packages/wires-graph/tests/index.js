import assert from 'assert';

import createGraph from '../src/index';

describe.only('Graph', () => {
  describe('createGraph()', () => {
    it('returns correct API', () => {
      const graph = createGraph();
      const properties = Object.getOwnPropertyNames(graph);
      const expected = [
        'createProcess',
        'process'
      ];

      assert.deepEqual(properties, expected);
    });
  });

  describe('graph instancd', () => {
    describe('createProcess()', () => {
      it('returns created process with correct properties', () => {
        const graph = createGraph();

        function fakeProcess() {}

        const createdProcess = graph.createProcess(fakeProcess);

        assert.deepStrictEqual(createdProcess, {
          uid: 'fakeProcess_1',
          processor: fakeProcess
        });
      });

      it('returns created process with incremented UID', () => {
        const graph = createGraph();

        function fakeProcess() {}
        function anotherFakeProcess() {}

        const createdProcess1 = graph.createProcess(fakeProcess);
        const createdProcess2 = graph.createProcess(fakeProcess);
        const createdProcess3 = graph.createProcess(anotherFakeProcess);

        assert.strictEqual(createdProcess1.uid, 'fakeProcess_1');
        assert.strictEqual(createdProcess2.uid, 'fakeProcess_2');
        assert.strictEqual(createdProcess3.uid, 'anotherFakeProcess_1');
      });

      it('throws error with correct message if processor is not defined', () => {
        const graph = createGraph();

        assert.throws(() => {
          graph.createProcess();
        }, {
          message: 'Function is required to create a process'
        });
      });

      it('throws error with correct message if processor is not a function', () => {
        const graph = createGraph();

        assert.throws(() => {
          graph.createProcess('function');
        }, {
          message: 'Function is required to create a process'
        });
      });
    });

    describe('process', () => {
      it('throws error with correct message if created process is not defined', () => {
        const graph = createGraph();

        assert.throws(() => {
          graph.process();
        }, {
          message: 'Created process is a required argument'
        });
      });

      it('throws error with correct message if created process does not have correct schema', () => {
        const graph = createGraph();

        assert.throws(() => {
          graph.process({ id: 'not_uid', compute: () => {} });
        }, {
          message: 'Created process does not conform to { uid: [string], processor: [function] }'
        });
      });
    });
  });
});
