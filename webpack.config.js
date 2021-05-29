/* eslint-disable */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const babelExclude = /node_modules/;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
// 	.BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');


const alias = {}
if (process.env.NODE_ENV !== 'production' && process.env.NO_STUBS === undefined) {
};

const babelLoader = {
  test: /\.(ts|js|jsx|tsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    compact: true,
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            browsers: ['last 2 versions', 'ie >= 9'],
          },
        },
      ],
      '@babel/typescript',
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-syntax-dynamic-import',
    ],
    env: {
      test: {
        plugins: [
          '@babel/plugin-transform-modules-commonjs',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-syntax-dynamic-import',
        ],
      },
    },
  },
};

var config = {
  entry: path.join(__dirname, 'src/index.ts'),
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        oneOf: [babelLoader],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias,
  },
  externals: /^(react|@material-ui(\/.*)?|immutability-helper|classnames|lodash(\/.*)?|@material-ui\/icons(\/.*)?|nanoid)$/,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // new BundleAnalyzerPlugin()
    new CompressionPlugin(),
  ],
  target: 'node',
  optimization: {
    minimize: true,
  },
};
module.exports = config
