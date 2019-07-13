function Log({ in1 = '' } = {}) {
  if (in1) {
    console.log('LOG:', in1);
  }

  return {};
}

module.exports = Log;
