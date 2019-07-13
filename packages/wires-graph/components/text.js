function Prepend({ textToPrepend = "", text = "" } = {}) {
  return { text: textToPrepend + text };
}

module.exports = {
  Prepend
};
