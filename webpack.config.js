'use strict';

const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  context: path.resolve('src'),
  entry: './index.js',
  output: {
    path: path.resolve('docroot'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve('docroot'),
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
};
