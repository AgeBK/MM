const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const jQueryMin = 'jquery/dist/jquery.slim.min.js';
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log('Mode: Prod');

module.exports = {
  mode: 'production',
  entry: { app: './src/index.js' },
  output: {
    // publicPath: where Webpack serves its ‘Virtual files
    path: path.resolve(__dirname, 'dist'),
    //publicPath: "/",
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      jquery: jQueryMin,
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        loader: 'babel-loader',
        include: /src/,
        exclude: /node_modules/,
        options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true
        }
      },
      {
        test: /\.svg$/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'svg-url-loader', options: { jsx: true } }
        ]
      },
      // { test: /\.html$/, use: [{ loader: "html-loader", options: { minimize: true } }] },
      {
        // "url" loader works like "file" loader except that it embeds assets
        // smaller than specified limit in bytes as data URLs to avoid requests.
        // A missing `test` is equivalent to a match.
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(s?css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: { plugins: [autoPrefixer('last 2 version')] }
            },
            { loader: 'sass-loader' }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  devtool: 'source-map', // best quality option for production
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebPackPlugin({
      template: './src/public/index.html',
      favicon: './src/public/favicon.ico', // TODO: CHECK THIS WORKS
      filename: 'index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin({ filename: '[name].[hash].css' }),
    // Make sure this is after ExtractTextPlugin!
    new PurifyCSSPlugin({
      // absolute path to components jsx files including sub folders
      paths: glob.sync(path.join(__dirname, 'src/components/**/*.jsx')),
      minimize: true,
      purifyOptions: {
        whitelist: []
      }
    }),
    // Tell webpack we want hot reloading
    new webpack.HotModuleReplacementPlugin(),
    // ProvidePlugin like globals, saves having to import/require everywhere
    new webpack.ProvidePlugin({
      // identifier: module
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    })
  ]
};
