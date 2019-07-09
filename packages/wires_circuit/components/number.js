function Round({ number = 0 } = {}) {
  return {
    roundedNumber: Math.round(number)
  }
};

function Random({ min = 0, max = 100, generate = true } = {}) {
  return { number: Math.random() * ((max - min) + 1) + min }
};

function Compare({ in1 = 0, in2 = 0, comparator = '>' } = {}) {
  return {
    // Yeah, I know. Just for now.
    out: eval(`${in1} ${comparator} ${in2}`)
  };
};

module.exports = {
  Round,
  Random,
  Compare
};
