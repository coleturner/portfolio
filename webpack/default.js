const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const WebpackRailsI18nJS = require('webpack-rails-i18n-js-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const assetURL = '//' + process.env.ASSET_HOST + '/';

const useHash = process.env.NODE_ENV === 'production' ? true : false;

const jsxRules = [
  {
    loader: 'babel-loader',
    options: {
      env: {
        production: {
          comments: false,
          minified: true
        },
        development: {
          comments: true,
          minified: false
        }
      }
    }
  }];

const config = {
  context: path.resolve(__dirname, '../', 'app/assets/'),
  entry: {
    'main': [
      'babel-polyfill',
      'react-hot-loader/patch',
      './javascripts/main.js',
      './stylesheets/main.scss',
    ]
  },
  output: {
    filename: '[name]' + (useHash ? '.[hash]' : '') + '.js',
    path: path.resolve(__dirname, '../', 'public/assets/'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: [/node_modules/],
        use: jsxRules
      },
      {
        test: /\.(scss|css)$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                root: encodeURIComponent(assetURL),
                sourceMap: true
              }
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader?sourceMap',
              options: {
                plugins: () => {
                  return [autoprefixer({ browsers: ['last 3 version', '> 5%'] })];
                }
              }
            }
          ]
        })
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/i,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            hash: 'sha512',
            'digest': 'hex',
            'name': '[path][name]' + (useHash ? '.[hash]' : '') + '.[ext]'
          }
        }]
      },
      {
        test: /\.svg$/,
        issuer: /\.jsx$/,
        use: [{
          loader: 'svg-sprite-loader',
          options: {
            name: '[name]_[hash]',
            prefixize: true
          }
        }]
      },
      {
        test: /\.svg$/i,
        issuer: /\.s?css$/,
        use: [{
          loader: 'file-loader'
        }]
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new WebpackRailsI18nJS({
      locale: 'html.lang',
      defaultLocale: 'en'
    }),
    new CopyWebpackPlugin([
        { from: '**/*.{gif,png,jpe?g,svg}' }
    ]),
    new ManifestPlugin(),
    new ExtractTextPlugin('[name]' + (useHash ? '.[hash]' : '') + '.css'),
    new WriteFilePlugin({
      force: true
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

module.exports = config;
