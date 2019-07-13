const fs = require('fs');

function WriteFile({ path = '', content = '' } = {}) {
  return (next) => {
    fs.writeFile(path, content, (err) => {
      next({ path, content, err });
    });
  };
};

function ReadFile({ path = '' } = {}) {
  return (next) => {
    fs.readFile(path, 'utf8', (err, content) => {
      next({ err, path, content });
    });
  };
};

module.exports = { WriteFile, ReadFile };
