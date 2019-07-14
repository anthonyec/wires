import assert from 'assert';

import component from './';
import process from './process';

describe('Parse', () => {
  describe('component', () => {
    it('has correct meta', () => {
      const { name, description, version, icon } = component;
      const expectedName = 'Parse';
      const expectedDescription = 'Parse JSON string to object';

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
        jsonString: {
          label: 'JSON String',
          type: 'string',
          input: true
        },
        out: {
          label: 'JSON Output',
          type: 'object',
          output: true
        }
      };

      assert.deepStrictEqual(props, expectedProps);
    });
  });

  describe('process', () => {
    it('parses JSON string', () => {
      const jsonString = '{ "key": "value", "number": 123, "bool": true }';
      const output = process({ jsonString });

      assert.deepStrictEqual(output, {
        out: {
          key: 'value',
          number: 123,
          bool: true
        }
      });
    });

    it('outputs err when JSON string is invalid', () => {
      const jsonString = '"key": value';
      const output = process({ jsonString });

      assert.strictEqual(output.err instanceof Error, true);
    });
  });
});
