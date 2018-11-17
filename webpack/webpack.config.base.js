const path = require('path');

const baseConfig = {
  node: {
    __dirname: false,
    __filename: false
  },
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
  plugins: [],
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

const productionConfig = {
  mode: 'production',
};

const developmentConfig = {
  mode: 'development',
}

function applyEnvironment(env) {
  if (env === 'production') {
    return Object.assign({}, baseConfig, productionConfig);
  }
  
  return Object.assign({}, baseConfig, developmentConfig);
}

module.exports = applyEnvironment(process.env.ENV);