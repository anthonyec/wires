function Delay({ time = 1000, in1 = true } = {}) {
  return next => {
    setTimeout(() => {
      next({ out: "timeout_done" });
    }, time);
  };
}

function Interval({ time = 1000, in1 = true } = {}) {
  return next => {
    setInterval(() => {
      next({ out: in1 });
    }, time);
  };
}

module.exports = {
  Delay,
  Interval
};
