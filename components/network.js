const http = require('http');

function Request({ url = '' } = {}) {
  return (next) => {
    try {
      http.get(url, function(response) {
        let data = '';
        response.on('data', (chunk) => { data += chunk; });
        response.on('end', () => {
          next({ data });
        });
      });
    } catch(err) {
      next({ data: '', err });
    }
  };
};

module.exports = { Request }
