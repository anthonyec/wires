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

  return {
    out: comparators[comparator](in1, in2)
  };
}
