const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base');

const playerConfig = Object.assign({}, baseConfig, {
  target: 'electron-renderer',
  entry: {
    player: './src/player/index.tsx',
  },
  plugins: [
    ...baseConfig.plugins,
    new HtmlWebpackPlugin({
      title: 'Electric Player',
      filename: 'player.html',
      template: './views/player.html'
    })
  ],
});

const productionConfig = {};

const developmentConfig = {
  devtool: 'inline-source-map',
  devServer: {
   contentBase: './dist',
   hot: true,
   watchContentBase: true,
  },
  plugins: [
    ...playerConfig.plugins,
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    ...baseConfig.output,
    publicPath: 'http://localhost:8080/dist/'
  }
}

function applyEnvironment(env) {
  if (env === 'production') {
    return Object.assign({}, playerConfig, productionConfig);
  }
  
  return Object.assign({}, playerConfig, developmentConfig);
}

module.exports = applyEnvironment(process.env.ENV);
