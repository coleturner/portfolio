const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const useHash = process.env.NODE_ENV === 'production' ? true : false;
console.log("Using", process.env.NODE_ENV, "config");

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

const baseCSSLoaders = [
  {
    loader: 'css-loader',
    options: {
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
];

const cssLoaders = process.env.NODE_ENV === 'production'
  ? ExtractTextPlugin.extract({ fallback: 'style-loader', use: baseCSSLoaders })
  : [{ loader: 'style-loader', options: { sourceMap: true } }].concat(baseCSSLoaders);

const config = {
  context: path.resolve(__dirname, './assets/'),
  entry: {
    'main': [
      'babel-polyfill',
      'react-hot-loader/patch',
      './javascripts/main.js'
    ]
  },
  devtool: process.env.NODE_ENV === 'production'
    ? 'source-map' : 'eval-source-map',
  output: {
    filename: '[name]' + (useHash ? '.[hash]' : '') + '.js',
    path: path.resolve(__dirname, './public/'),
    publicPath: '/public/'
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
        use: cssLoaders
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new CopyWebpackPlugin([
        { from: '**/*.{gif,png,jpe?g,svg,ico}' }
    ]),
    new ManifestPlugin(),
    new ExtractTextPlugin('[name]' + (useHash ? '.[hash]' : '') + '.css'),
    new WriteFilePlugin({
      force: true,
      log: false
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

if (process.env.NODE_ENV !== 'production') {
  config.devServer = {
    hot: true,
    disableHostCheck: true,
    contentBase: './public',
    port: process.env.SERVER_PORT,
    headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' }
  };

  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ].concat(config.plugins);

  config.watch = true;

  for (let key in config.entry) {
    if (config.entry.hasOwnProperty(key)) {
      config.entry[key] =
        config.entry[key].concat(['webpack-hot-middleware/client']);
    }
  }
}

module.exports = config;
