const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const baseConfig = require('./webpack.config.base');

module.exports = Object.assign({}, baseConfig, {
  target: 'electron-renderer',
  entry: {
    player: './src/player/index.tsx',
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '..', 'views', 'player.html'),
      to: path.join(__dirname, '..', 'dist', 'player.html'),
    }])
  ]
})
