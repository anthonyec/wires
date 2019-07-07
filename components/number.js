function Round({ number = 0 } = {}) {
  return {
    roundedNumber: Math.round(number)
  }
};

function Random({ min = 0, max = 100, generate = true } = {}) {
  return { number: Math.random() * ((max - min) + 1) + min }
}

module.exports = {
  Round,
  Random
};
