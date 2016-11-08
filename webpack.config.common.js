const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry:   [
    './src/main.js'
  ],
  output:  {
    path:     path.join(__dirname, 'public/dist'),
    filename:   '1x1trainer.js',
    publicPath: '/dist'
  },
  module:  {
    loaders: [
    {
      test:  /\.js$/,
      loaders:  ['babel'],
      exclude: /node_modules/
    },
    {
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/
    }
    ]
  }
};

