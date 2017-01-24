const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack/webpack.hot.dev.config.js');
const debug = require('debug');
const wdsLogger = debug('dev:WDS');
const wdsErrorLogger = debug('dev:WDS:error');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  progress: true,
  colors: true,
  inlined: true,
  headers: { 'Access-Control-Allow-Origin': '*' }
}).listen(3005, '127.0.0.1', function (err) {
  if (err) {
    return wdsErrorLogger(err);
  }

  wdsLogger('Listening at http://localhost:3005/');
});
