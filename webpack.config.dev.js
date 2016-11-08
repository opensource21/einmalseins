const webpack = require('webpack');
const common = require('./webpack.config.common');

const port = 9999;


const devConfig = Object.assign({}, common, {
  entry:   [
    'webpack-dev-server/client?http://localhost:' + port,
    'webpack/hot/only-dev-server',
    './src/main.js'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
});
devConfig.module.loaders[0].loaders.splice(0, 0, 'react-hot');

module.exports = {devConfig, port};
