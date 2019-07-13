const https = require("https");

function Request({ url = "" } = {}) {
  return next => {
    try {
      https.get(url, function(response) {
        let data = "";
        response.on("data", chunk => {
          data += chunk;
        });
        response.on("end", () => {
          next({ data });
        });
      });
    } catch (err) {
      next({ data: "", err });
    }
  };
}

module.exports = { Request };
