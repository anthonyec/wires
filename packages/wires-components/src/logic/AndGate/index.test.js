import assert from 'assert';

import component from './';
import process from './process';

describe('AndGate', () => {
  describe('component', () => {
    it('has correct meta', () => {
      const { name, description, version, icon } = component;

      assert.strictEqual(name, 'AND Gate');
      assert.strictEqual(
        description,
        'Output true when all of the inputs are true'
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
    it('outputs false when in1 and in2 are both false', () => {
      const output = process({ in1: false, in2: false });

      assert.deepStrictEqual(output, { out: false });
    });

    it('outputs false when in1 is true and in2 is false', () => {
      const output = process({ in1: true, in2: false });

      assert.deepStrictEqual(output, { out: false });
    });

    it('outputs false when in1 is false and in2 is true', () => {
      const output = process({ in1: false, in2: true });

      assert.deepStrictEqual(output, { out: false });
    });

    it('outputs true when in1 is true and in2 is true', () => {
      const output = process({ in1: true, in2: true });

      assert.deepStrictEqual(output, { out: true });
    });

    it('outputs true when in1 is a string and in2 is true', () => {
      const output = process({ in1: 'Test', in2: true });

      assert.deepStrictEqual(output, { out: true });
    });

    it('outputs a string when in1 is true and in2 is a string', () => {
      const output = process({ in1: true, in2: 'Test' });

      assert.deepStrictEqual(output, { out: 'Test' });
    });

    it('outputs false when in1 and in2 is not defined', () => {
      const output = process();

      assert.deepStrictEqual(output, { out: false });
    });
  });
});
