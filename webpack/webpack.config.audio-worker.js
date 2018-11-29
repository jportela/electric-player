const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base');

const audioWorkerConfig = Object.assign({}, baseConfig, {
  target: 'electron-renderer',
  entry: {
    audioWorker: './src/audio-worker/index.ts',
  },
  plugins: [
    ...baseConfig.plugins,
    new HtmlWebpackPlugin({
      filename: 'audio-worker.html',
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
    ...audioWorkerConfig.plugins,
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    ...baseConfig.output,
    publicPath: 'http://localhost:8080/dist/'
  }
}

function applyEnvironment(env) {
  if (env === 'production') {
    return Object.assign({}, audioWorkerConfig, productionConfig);
  }
  
  return Object.assign({}, audioWorkerConfig, developmentConfig);
}

module.exports = applyEnvironment(process.env.ENV);
