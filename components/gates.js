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
