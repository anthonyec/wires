function Delay({ time = 1000, in1 = true } = {}) {
  return (execute) => {
    setTimeout(() => {
      execute({ out: 'timeout_done' });
    }, time);
  }
};

function Interval({ time = 1000, in1 = true } = {}) {
  return (execute) => {
    setInterval(() => {
      execute({ out: in1 });
    }, time);
  }
};

module.exports = {
  Delay,
  Interval
};
