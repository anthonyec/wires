function Compare({ in1 = 0, in2 = 0, comparator = '>' } = {}) {
  const comparators = {
    '>': (a, b) => a > b,
    '<': (a, b) => a < b,
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b,
    '==': (a, b) => a === b,
    '!==': (a, b) => a !== b
  };

  return {
    out: comparators[comparator](in1, in2)
  }
};

function AndGate({ in1 = false, in2 = false } = {}) {
  return {
    out: in1 && in2
  }
};

function OrGate({ in1 = false, in2 = false } = {}) {
  return {
    out: in1 || in2
  }
};

function NotGate({ in1 = false } = {}) {
  return {
    out: !in1
  }
};

module.exports = {
  AndGate,
  OrGate,
  NotGate
};
