const path = require('path');

module.exports = {
  node: {
    __dirname: false,
    __filename: false
  },
  mode: process.env.ENV || 'development',
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
    }],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
};