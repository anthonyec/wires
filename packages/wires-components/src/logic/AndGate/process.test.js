import assert from 'assert';

import process from './process';

describe('AndGate', () => {
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
});
