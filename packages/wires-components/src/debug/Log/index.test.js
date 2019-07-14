import assert from 'assert';
import sinon from 'sinon';

import component from './';
import process from './process';

const sandbox = sinon.createSandbox();

describe('Log', () => {
  beforeEach(() => {
    sandbox.restore();
  });

  describe('component', () => {
    it('has correct meta', () => {
      const { name, description, version, icon } = component;

      assert.strictEqual(name, 'Log');
      assert.strictEqual(description, 'Log input to the developer console');
      assert.strictEqual(version, 1);
      assert.strictEqual(icon, '');
    });

    it('has correct process', () => {
      assert.strictEqual(component.process === process, true);
    });

    it('has correct props', () => {
      const { props } = component;
      const expectedProps = {
        value: {
          label: 'Value',
          type: 'string',
          default: '',
          input: true,
          output: true
        },
        logger: {
          type: 'object',
          private: true
        }
      };

      assert.deepStrictEqual(props, expectedProps);
    });
  });

  describe('process', () => {
    it('uses logger passed in as props', () => {
      const fakeLogger = sandbox.stub();

      process({ logger: fakeLogger, value: '123' });

      sandbox.assert.calledOnce(fakeLogger);
      sandbox.assert.calledWith(fakeLogger, '123');
    });

    it('calls logger if value exists', () => {
      const fakeLogger = sandbox.stub();

      process({ logger: fakeLogger, value: '' });

      sandbox.assert.calledOnce(fakeLogger);
    });

    it('does not call logger if value is null and returns empty', () => {
      const fakeLogger = sandbox.stub();
      const output = process({ logger: fakeLogger, value: null });

      sandbox.assert.notCalled(fakeLogger);
      assert.deepStrictEqual(output, {});
    });

    it('does not call logger if value is undefined and returns empty', () => {
      const fakeLogger = sandbox.stub();
      const output = process({ logger: fakeLogger, value: undefined });

      sandbox.assert.notCalled(fakeLogger);
      assert.deepStrictEqual(output, {});
    });

    it('returns value that is passed into it', () => {
      const fakeLogger = sandbox.stub();
      const output = process({ logger: fakeLogger, value: '123' });

      assert.deepStrictEqual(output, { value: '123' });
    });
  });
});
