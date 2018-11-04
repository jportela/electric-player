const baseConfig = require('./webpack.config.base');

module.exports = Object.assign({}, baseConfig, {
  target: 'electron-main',
  entry: {
    main: './src/main/index.ts',
  },
})
