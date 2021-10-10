/* eslint-disable */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const babelExclude = /node_modules/;
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

const babelLoader = {
  test: /\.(ts|js|jsx|tsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    compact: true,
    sourceType: 'unambiguous',
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

const cssLoaderClient = {
  test: /\.(css|scss)$/,
  exclude: /node_modules/,
  use: [
    'css-hot-loader',
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        sourceMap: true,
        modules: {
          localIdentName: '[name]__[local]___[hash:base64:5]',
          exportLocalsConvention: 'camelCase',
        },
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
      },
    },
  ],
};

const alias = {
  "@core-types": path.resolve(__dirname, './src/types/'),
  "@utils": path.resolve(__dirname, './src/helpers/utils/'),
  "@config": path.resolve(__dirname, './src/config/'),
  "@helpers": path.resolve(__dirname, './src/helpers/'),
  "@universal-schema": path.resolve(__dirname, 'src/universal-schema/'),
  "@cross-framework-wrapper": path.resolve(__dirname, 'src/cross-framework-wrapper/'),
  "@generated": path.resolve(__dirname, 'src/framework/generated/'),
  "@framework": path.resolve(__dirname, 'src/framework/'),
};

if (process.env.NODE_ENV !== 'production' && process.env.NO_STUBS === undefined) {
};

var config = {
  entry: {
    bundle: ['@babel/polyfill', path.join(__dirname, 'demo/web/react/index.jsx')],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  optimization: {
    minimize: true,
    moduleIds: 'named',
    chunkIds: 'named',
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      maxSize: 120000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        oneOf: [
          babelLoader,
          cssLoaderClient,
          {
            test: /\.(gif|png|jpe?g|svg|css)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 50000,
                },
              },
              {
                loader: 'image-webpack-loader',
              },
            ],
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias,
    modules: ['node_modules'],
    fallback: {
      url: require.resolve('url-shim'),
    },
  },
  mode: process.env.NODE_ENV,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.NODE_DEBUG': JSON.stringify('debug'),
      'process.env.GENERATED_SESSION_ID': process.env.GENERATED_SESSION_ID,
    }),
    new HtmlWebpackPlugin({
      template: 'demo/web/react/index.html',
      templateParameters(compilation, assets, options) {
        return {
          compilation: compilation,
          webpack: compilation.getStats().toJson(),
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            files: assets,
            options: options,
          },
          process,
        };
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: 'main.css',
    }),
  ],
  target: 'web',
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
//   config.entry.splice(0, 0, 'webpack-hot-middleware/client');
//   config.entry.splice(0, 0, 'react-hot-loader/patch');
//   config.module.rules.push(
//     { enforce: 'pre', test: /\.jsx?$/, loader: 'eslint-loader', exclude: babelExclude },
//   );
}
module.exports = config
