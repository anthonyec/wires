import assert from 'assert';

import component from './';
import process from './process';
import { BOOLEAN } from '../../types';

describe('NotGate', () => {
  describe('component', () => {
    it('has correct meta', () => {
      const { name, description, version, icon } = component;
      const expectedName = 'NOT Gate';
      const expectedDescription = 'Output the inverted input';

      assert.strictEqual(name, expectedName);
      assert.strictEqual(description, expectedDescription);
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
          label: 'Input',
          type: BOOLEAN,
          default: false,
          input: true
        },
        out: {
          label: 'Output',
          type: BOOLEAN,
          output: true
        }
      };

      assert.deepStrictEqual(props, expectedProps);
    });
  });

  describe('process', () => {
    it('outputs true when in1 is false', () => {
      const output = process({ in1: false });

      assert.deepStrictEqual(output, { out: true });
    });

    it('outputs false when in1 is true', () => {
      const output = process({ in1: true });

      assert.deepStrictEqual(output, { out: false });
    });
  });
});
