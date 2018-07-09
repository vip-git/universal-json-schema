/* eslint-disable */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const babelExclude = /node_modules/;
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const extractScss = new ExtractTextPlugin({ filename: "style.css", allChunks: true })
const extractCss = new ExtractTextPlugin({ filename: "main.css", allChunks: true })

const alias = {}
if (process.env.NODE_ENV !== 'production' && process.env.NO_STUBS === undefined) {
};

var config = {
  entry: ['babel-polyfill', path.join(__dirname, 'src/demo/index.jsx')],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'demo.js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.jsx?$/,
            use: ['babel-loader'],
            exclude: babelExclude,
          },
          {
            test: /\.scss$/,
            use: extractScss.extract({
              use: [{
                loader: 'css-loader',
                options: {
                  localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
                  modules: true,
                  camelCase: true,
                }
              }, {
                loader: 'sass-loader',
              }]
            }),
          },
          {
            test: /\.css$/,
            use: extractCss.extract({
              use: [{
                loader: 'css-loader',
              }]
            }),
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            loaders: [
              {
                loader: 'url-loader',
                options: {
                  limit: 50000,
                },
              }, {
                loader: 'image-webpack-loader',
              }
            ]
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /.s?css$/],
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias,
    modules: ['node_modules']
  },
  plugins: [
    extractCss,
    extractScss,
    new HtmlWebpackPlugin({
      template: 'src/demo/index.html',
    }),
    new webpack.NamedModulesPlugin(),
  ],
  target: 'web'
}



// PROD ONLY
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
  );
}
// NON-PROD ONLY
else {
  config.plugins.push(
    // new CleanWebpackPlugin([path.join(__dirname, '../dist')], { root: process.cwd() }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: path.join(__dirname, '.eslintrc.js'),
          failOnWarning: false,
          failOnError: true,
          ignorePatten: ['node_modules', 'dist']
        },
      },
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   openAnalyzer: false,
    // }),
  );
  config.entry.splice(0, 0, 'webpack-hot-middleware/client');
  config.entry.splice(0, 0, 'react-hot-loader/patch');
  config.module.rules.push(
    { enforce: 'pre', test: /\.jsx?$/, loader: 'eslint-loader', exclude: babelExclude },
  );
}
module.exports = config
