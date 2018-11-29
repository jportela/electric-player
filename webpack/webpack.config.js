const mainConfig = require('./webpack.config.main');
const playerConfig = require('./webpack.config.player');
const audioWorkerConfig = require('./webpack.config.audio-worker');

module.exports = [
  mainConfig,
  playerConfig,
  audioWorkerConfig
];
