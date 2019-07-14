export default function ConditionalGate({
  in1 = 0,
  in2 = 0,
  comparator = '>'
} = {}) {
  const comparators = {
    '>': (a, b) => a > b,
    '<': (a, b) => a < b,
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b,
    '==': (a, b) => a === b,
    '!=': (a, b) => a !== b
  };

  const comparatorToUse = comparators[comparator]
    ? comparator
    : '>';

  return {
    out: comparators[comparatorToUse](in1, in2)
  };
}
