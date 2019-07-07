const http = require('http');

function Request({ url = '' } = {}) {
  return (execute) => {
    try {
      http.get(url, function(response) {
        let data = '';
        response.on('data', (chunk) => { data += chunk; });
        response.on('end', () => {
          execute({ data });
        });
      });
    } catch(err) {
      execute({ data: '', err });
    }
  };
};

module.exports = { Request }
