const path = require('path');

module.exports = {
  mode: "production",
  entry: "./static/js/lib.js",
  output: {
    filename: "lib.bundle.js",
    path: path.join(__dirname, "/static/dist")
  }
};