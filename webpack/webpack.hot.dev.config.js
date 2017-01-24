const webpack = require('webpack');
const path = require('path');
const root = path.resolve(__dirname, '../');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'cheap-source-map',
  debug: true,
  entry: {
    Entry: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:3005',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      path.resolve(root, './src/App/Entry')
    ]
  },
  output: {
    path: path.resolve(root, './dist'),
    filename: 'bundle-[name].js',
    publicPath: "http://localhost:3005/_assets/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
    })
],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.resolve(root, 'src')
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]&importLoaders=1!postcss'
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "postcss", "sass"],
      include: path.resolve(root, 'src')
    }, {
      test: /\.json$/,
      loaders: ["json"],
    }]
  },
  node: {
    child_process: 'empty',
    fs: 'empty'
  },
  postcss: function () { return [ autoprefixer ] }
};
