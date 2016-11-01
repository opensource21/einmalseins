const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const devconfig = require('./webpack.config.dev.js');

const config = devconfig.devConfig;
const port = devconfig.port;

console.log("Entry: " + config.entry)
console.log("Loaders: " + config.module.loaders[0].loaders)
new WebpackDevServer(webpack(config), {
  publicPath:         config.output.publicPath,
  contentBase:        path.join(__dirname, 'public'),
  hot:                true,
  historyApiFallback: true
}).listen(port, 'localhost', (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at localhost:' + port);
});
