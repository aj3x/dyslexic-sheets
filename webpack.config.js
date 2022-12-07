const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'pf2e.js',
    path: path.resolve(__dirname, ''),
  },
};