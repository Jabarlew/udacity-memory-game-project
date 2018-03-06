'use strict';

const path = require('path');

module.exports = {
    context: path.resolve('src'),
    entry: './index.js',
    output: {
        path: path.resolve('docroot'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devServer: {
        contentBase: path.resolve('docroot'),
    },
};