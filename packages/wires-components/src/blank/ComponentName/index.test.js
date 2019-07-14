import assert from 'assert';

import component from './';
import process from './process';

describe('Component Name', () => {
  describe('component', () => {
    it('has correct meta', () => {
      const { name, description, version, icon } = component;
      const expectedName = 'Component Name';
      const expectedDescription = 'Small description about the component';

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
          label: 'Input 1',
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
    it('outputs the value of in1', () => {
      const output = process({ in1: true });

      assert.deepStrictEqual(output, { out: true });
    });
  });
});
