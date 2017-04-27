var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  // combine 2 file to one entry
  // one entry is required to enable hot reload
  entry: ['./src/polyfills.ts', './src/main.ts'],

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    rules: [
      // handle all css files outside the app folder as embedded styles
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: 'style-loader!css-loader?sourceMap',
      },
    ]
  },

  plugins: [
    // During the hot update in webpack show friendly module name
    new webpack.NamedModulesPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    proxy: { 
      "/api/*": {
        "target": "http://localhost:3000",
        "logLevel": "debug"
      }
    }
  }
});
