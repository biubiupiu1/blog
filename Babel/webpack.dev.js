/**
 * @type {import('webpack').Configuration}
 */

module.exports = {
  mode: 'none',
  entry: './index.js',
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist'
  },
};
