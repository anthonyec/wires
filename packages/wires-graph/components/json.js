function ParseJson({ in1 = '{}' } = {}) {
  try {
    return {
      out: JSON.parse(in1)
    };
  } catch (err) {
    return { err };
  }
}

function Pluck({ json = {}, path = '' }) {
  try {
    return {
      out: eval(`json${path}`)
    };
  } catch (err) {
    return { err };
  }
}

module.exports = {
  ParseJson,
  Pluck
};
