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
    },
    {
      test:/\.css$/,
      use:['style-loader','css-loader']
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
          loader: 'file-loader',
          options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
          }
      }]
    }
  ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  externals: [
    '7zip'
  ]
};