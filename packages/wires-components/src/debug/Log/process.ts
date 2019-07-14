function Log({ logger = console.log, value = null } = {}) {
  if (value !== null) {
    logger(value);
    return { value };
  }
}

export { Log };
