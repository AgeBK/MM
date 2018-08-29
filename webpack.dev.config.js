const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const PostCSSFlexbugsFixes = require('postcss-flexbugs-fixes');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const jQueryMin = 'jquery/dist/jquery.slim.min.js';

module.exports = {
  mode: 'development',
  entry: { app: './src/index.js' },
  output: {
    // publicPath: where Webpack serves its ‘Virtual files
    //path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      jquery: jQueryMin
      //     "react": "preact-compat",
      //     "react-dom": "preact-compat"
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
      // { test: /\.svg$/, use: [{ loader: "babel-loader" }, { loader: "svg-url-loader", options: { jsx: true } }] },
      // { test: /\.html$/, use: [{ loader: "html-loader", options: { minimize: true } }] },
      { test: /\.svg$/, use: [{ loader: 'file-loader' }] },
      {
        // "url" loader works like "file" loader except that it embeds assets
        // smaller than specified limit in bytes as data URLs to avoid requests.
        // A missing `test` is equivalent to a match.
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20000, // Convert images < 20kb to base64 strings, defaults to file loader if larger
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoPrefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'iOS >= 8',
                        'Firefox ESR',
                        'not ie < 9' // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009'
                    })
                  ]
                }
              }
            ]
          })
        )
      },
      {
        test: /\.(scss)$/,
        // We need to use ExtractTextPlugin because webpack by default only understands .js format.
        // ExtractTextPlugin gets your .css and extracts it into a separate .css file.
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
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true, // make back/forward buttons in browser work
    hot: true
    // host: 'localhost',
    // compress: true,
    // inline: true
    // port: 3131
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    //new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebPackPlugin({
      template: './src/public/index.html',
      favicon: './src/public/favicon.ico', // TODO: CHECK THIS WORKS
      filename: 'index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin({ filename: '[name].[hash].css', disable: true }), // disable in dev for HMR

    // new ExtractTextPlugin({ filename: '[name].[hash].css', allChunks: true }), // disable in dev for HMR
    // Make sure this is after ExtractTextPlugin!
    // new PurifyCSSPlugin({
    //   // absolute path to components jsx files including sub folders
    //   paths: glob.sync(path.join(__dirname, 'src/components/**/*.jsx')), // "Globs" are the patterns you type when you do stuff like ls *.js on the command line, or put build/* in a .gitignore file.
    //   minimize: true,
    //   purifyOptions: {
    //     whitelist: []
    //   }
    // }),
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
