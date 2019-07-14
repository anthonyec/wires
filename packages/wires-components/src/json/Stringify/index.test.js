import assert from 'assert';

import component from './';
import process from './process';

describe('Stringify', () => {
  describe('component', () => {
    it('has correct meta', () => {
      const { name, description, version, icon } = component;
      const expectedName = 'Stringify';
      const expectedDescription = 'Stringify JSON object to string';

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
        jsonObject: {
          label: 'JSON Object',
          type: 'object',
          input: true
        },
        out: {
          label: 'JSON String',
          type: 'string',
          output: true
        }
      };

      assert.deepStrictEqual(props, expectedProps);
    });
  });

  describe('process', () => {
    it('turns JSON object into string', () => {
      const json = {
        key: 'value',
        number: 123,
        bool: true
      };
      const expectedString = '{"key":"value","number":123,"bool":true}';
      const output = process({ jsonObject: json });

      assert.deepStrictEqual(output, { out: expectedString });
    });

    it('outputs err if object is not stringify-able', () => {
      // Create a circular object
      let json = {};
      json.a = json;

      const output = process({ jsonObject: json });

      assert.strictEqual(output.err instanceof Error, true);
    });
  });
});
