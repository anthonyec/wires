function wrap(func) {
  const name = func.name.charAt(0).toUpperCase() + func.name.slice(1);

  // TODO: Not all maths func except 1 arg. Work out how to add multi-args.
  const op = ({ in1 = 0 } = {}) => {
    return { out: func(in1) };
  };

  Object.defineProperty(op, "name", {
    value: name,
    writable: false
  });

  return op;
}

const mathFunctions = Object.getOwnPropertyNames(Math).reduce((mem, key) => {
  const isFunction = typeof Math[key] === "function";

  if (isFunction) {
    mem.push(Math[key]);
  }

  return mem;
}, []);

const wrappedMathFunctions = mathFunctions.reduce((mem, func) => {
  if (!mem[func.name]) {
    const wrappedFunc = wrap(func);
    mem[wrappedFunc.name] = wrappedFunc;
  }

  return mem;
}, {});

function Random({ min = 0, max = 100, exec = false } = {}) {
  return { out: Math.random() * (max - min + 1) + min };
}

function Operate({ in1 = 0, in2 = 0, operator = "+" } = {}) {
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "/": (a, b) => a / b,
    "*": (a, b) => a * b,
    "%": (a, b) => a * b,
    "^": (a, b) => a ^ b
  };

  return {
    out: operators[operator](in1, in2)
  };
}

module.exports = {
  ...wrappedMathFunctions,
  Random,
  Operate
};
