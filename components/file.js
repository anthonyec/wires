const fs = require('fs');

function WriteFile({ path = '', content = '' } = {}) {
  return (execute) => {
    fs.writeFile(path, content, (err) => {
      execute({ path, content, err });
    });
  };
};

function ReadFile({ path = '' } = {}) {
  return (execute) => {
    fs.readFile(path, 'utf8', (err, content) => {
      execute({ err, path, content });
    });
  };
};

module.exports = { WriteFile, ReadFile };
