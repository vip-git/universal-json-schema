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
  entry: path.join(__dirname, 'src/index.js'),
  // Package each language's worker and give these filenames in `getWorkerUrl`
  'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
  'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
  'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
  'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
  'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
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
    extensions: ['.js', '.jsx'],
    alias,
  },
  externals: /^(react|@material-ui(\/.*)?|immutability-helper|classnames|codemirror|lodash(\/.*)?|@material-ui\/icons(\/.*)?|react-codemirror2|shortid)$/,
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
