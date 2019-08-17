/* eslint-disable */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const babelExclude = /node_modules/;
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

const cssLoaderClient = {
	test: /\.(css|scss)$/,
	exclude: /node_modules/,
	use: [
		'css-hot-loader',
		MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				camelCase: true,
				modules: true,
				importLoaders: 1,
				sourceMap: true,
				localIdentName: '[name]__[local]--[hash:base64:5]'
			}
		},
		{
			loader: 'postcss-loader',
			options: {
				sourceMap: true
			}
		}
	]
};

const alias = {}
if (process.env.NODE_ENV !== 'production' && process.env.NO_STUBS === undefined) {
};

var config = {
	entry: {
		bundle: ['babel-polyfill', path.join(__dirname, 'src/demo/index.jsx')]
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'demo.js',
		publicPath: '/'
	},
	optimization: {
		minimize: true
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				oneOf: [
					{
						test: /\.jsx?$/,
						use: ['babel-loader'],
						exclude: babelExclude
					},
					cssLoaderClient,
					{
						test: /\.(gif|png|jpe?g|svg|css)$/i,
						loaders: [
							{
								loader: 'url-loader',
								options: {
									limit: 50000
								}
							},
							{
								loader: 'image-webpack-loader'
							}
						]
					},
					{
						exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
						loader: 'file-loader',
						options: {
							name: 'static/media/[name].[hash:8].[ext]'
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias,
		modules: ['node_modules']
	},
	mode: process.env.NODE_ENV,
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new HtmlWebpackPlugin({
			template: 'src/demo/index.html'
		}),
		new webpack.NamedModulesPlugin(),
		new MiniCssExtractPlugin({
			filename: 'style.css',
			chunkFilename: 'main.css'
		})
	],
	target: 'web'
};



// PROD ONLY
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new CompressionPlugin());
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
