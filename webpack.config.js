/* eslint-disable */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const babelExclude = /node_modules/;

const alias = {}
if (process.env.NODE_ENV !== 'production' && process.env.NO_STUBS === undefined) {
};

var config = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: babelExclude,
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias
  },
  externals: /^(react|material-ui(\/.*)?|immutability-helper|classnames|codemirror|lodash(\/.*)?|@material-ui\/icons(\/.*)?|react-codemirror2|shortid)$/,
  plugins: [
  ],
}
module.exports = config
