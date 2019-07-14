import assert from 'assert';

import component from './';
import process from './process';

describe('ConditionalGate', () => {
  describe('component', () => {
    it('has correct meta', () => {
      const { name, description, version, icon } = component;

      assert.strictEqual(name, 'Conditional Gate');
      assert.strictEqual(
        description,
        'Compare two values and output either true or false'
      );
      assert.strictEqual(version, 1);
      assert.strictEqual(icon, '');
    });

    it('has correct process', () => {
      assert.strictEqual(component.process === process, true);
    });

    it('has correct props', () => {
      const { props } = component;
      const expectedProps = {
        in1: {
          label: 'Input 1',
          type: 'bool',
          default: false,
          input: true
        },
        in2: {
          label: 'Input 2',
          type: 'bool',
          default: false,
          input: true
        },
        comparator: {
          label: 'Comparator',
          type: 'selection',
          default: '>',
          options: ['>', '<', '>=', '<=', '==', '!='],
          input: true
        },
        out: {
          label: 'Output',
          type: 'bool',
          output: true
        }
      };

      assert.deepStrictEqual(props, expectedProps);
    });
  });

  describe('process', () => {
    describe('">" default comparator', () => {
      it('outputs false when in1 is smaller than in2', () => {
        const output = process({ in1: 0, in2: 10 });

        assert.deepStrictEqual(output, { out: false });
      });

      it('outputs true when in1 is bigger than in2', () => {
        const output = process({ in1: 10, in2: 0 });

        assert.deepStrictEqual(output, { out: true });
      });

      it('uses default when comparator is not recognised', () => {
        const output = process({ in1: 10, comparator: '*', in2: 0 });

        assert.deepStrictEqual(output, { out: true });
      });
    });

    describe('">" more than comparator', () => {
      it('outputs false when in1 is smaller than in2', () => {
        const output = process({ in1: 0, comparator: '>', in2: 10 });

        assert.deepStrictEqual(output, { out: false });
      });

      it('outputs true when in1 is bigger than in2', () => {
        const output = process({ in1: 10, comparator: '>', in2: 0 });

        assert.deepStrictEqual(output, { out: true });
      });
    });

    describe('"<" less than comparator', () => {
      it('outputs true when in1 is smaller than in2', () => {
        const output = process({ in1: 0, comparator: '<', in2: 10 });

        assert.deepStrictEqual(output, { out: true });
      });

      it('outputs false when in1 is bigger than in2', () => {
        const output = process({ in1: 10, comparator: '<', in2: 0 });

        assert.deepStrictEqual(output, { out: false });
      });
    });

    describe('">=" more than or equal comparator', () => {
      it('outputs false when in1 is smaller than in2', () => {
        const output = process({ in1: 0, comparator: '>=', in2: 10 });

        assert.deepStrictEqual(output, { out: false });
      });

      it('outputs true when in1 is bigger than in2', () => {
        const output = process({ in1: 10, comparator: '>=', in2: 0 });

        assert.deepStrictEqual(output, { out: true });
      });

      it('outputs true when in1 is equal to in2', () => {
        const output = process({ in1: 10, comparator: '>=', in2: 10 });

        assert.deepStrictEqual(output, { out: true });
      });
    });

    describe('"<=" less than or equal comparator', () => {
      it('outputs true when in1 is smaller than in2', () => {
        const output = process({ in1: 0, comparator: '<=', in2: 10 });

        assert.deepStrictEqual(output, { out: true });
      });

      it('outputs false when in1 is bigger than in2', () => {
        const output = process({ in1: 10, comparator: '<=', in2: 0 });

        assert.deepStrictEqual(output, { out: false });
      });

      it('outputs true when in1 is equal to in2', () => {
        const output = process({ in1: 10, comparator: '<=', in2: 10 });

        assert.deepStrictEqual(output, { out: true });
      });
    });

    describe('"==" equal comparator', () => {
      it('outputs false when in1 is not equal to in2', () => {
        const output = process({ in1: 0, comparator: '==', in2: 10 });

        assert.deepStrictEqual(output, { out: false });
      });

      it('outputs true when in1 is equal to in2', () => {
        const output = process({ in1: 10, comparator: '==', in2: 10 });

        assert.deepStrictEqual(output, { out: true });
      });
    });

    describe('"!=" equal comparator', () => {
      it('outputs true when in1 is not equal to in2', () => {
        const output = process({ in1: 0, comparator: '!=', in2: 10 });

        assert.deepStrictEqual(output, { out: true });
      });

      it('outputs false when in1 is equal to in2', () => {
        const output = process({ in1: 10, comparator: '!=', in2: 10 });

        assert.deepStrictEqual(output, { out: false });
      });
    });
  });
});
