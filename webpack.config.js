const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = (env, args) => {
  const isProduction =
    args.mode === 'production' || process.env.NODE_ENV === 'production';
  console.log('Using', isProduction ? 'production' : 'development', 'config'); // eslint-disable-line

  const config = {
    mode: isProduction ? 'production' : 'development',
    context: path.resolve(__dirname, './assets/'),
    entry: {
      main: [
        !isProduction && 'react-hot-loader/patch',
        './javascripts/main.js'
      ].filter(n => n)
    },
    devtool: isProduction ? false : 'eval-source-map',
    output: {
      filename: '[name]' + (isProduction ? '.[hash]' : '') + '.js',
      path: path.resolve(__dirname, './public/'),
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/i,
          exclude: [/node_modules/],
          use: [
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
            }
          ]
        },
        {
          test: /\.(scss|css)$/i,
          use: [
            isProduction
              ? MiniCssExtractPlugin.loader
              : { loader: 'style-loader', options: { sourceMap: true } },
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
                  return [
                    autoprefixer({ browsers: ['last 3 version', '> 5%'] })
                  ];
                }
              }
            }
          ]
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/i,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                hash: 'sha512',
                digest: 'hex',
                name:
                  '[path][name]' + (isProduction ? '.[hash]' : '') + '.[ext]'
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                }
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          issuer: /\.jsx$/,
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                symbolId: '[name]_[hash]'
              }
            },

            {
              loader: 'image-webpack-loader'
            }
          ]
        },
        {
          test: /\.svg$/i,
          issuer: /\.s?css$/,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        }
      ]
    },
    node: {
      fs: 'empty'
    },
    plugins: [
      new CleanWebpackPlugin(['./public']),
      new Visualizer(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          isProduction ? 'production' : 'development'
        )
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new CopyWebpackPlugin([{ from: '**/*.{gif,png,jpe?g,svg,ico}' }]),
      new ManifestPlugin(),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name]' + (isProduction ? '.[hash]' : '') + '.css',
        chunkFilename: '[id]' + (isProduction ? '.[hash]' : '') + '.css'
      }),
      new WriteFilePlugin({
        force: true,
        log: false
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx']
      /* alias:
        isProduction
          ? {
            react: 'preact-compat',
            'react-dom': 'preact-compat',
            'preact-compat': 'preact-compat/dist/preact-compat',
            'react-emotion': 'preact-emotion'
          }
          : {}*/
    }
  };

  if (isProduction) {
    config.plugins.push(new MinifyPlugin(null, { test: /\.jsx?$/i }));
    // config.optimization = {
    //   minimizer: [
    //     new UglifyJsPlugin({
    //       parallel: true,

    //       uglifyOptions: {
    //         compress: {
    //           dead_code: true
    //         }
    //       }
    //     })
    //   ]
    // };
  } else {
    config.devServer = {
      hot: true,
      disableHostCheck: true,
      contentBase: './public',
      port: process.env.SERVER_PORT,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      },
      stats: {
        assets: true,
        assetsSort: 'field',
        builtAt: true,
        children: true,
        performance: true,
        publicPath: true,
        reasons: true,
        timings: true,
        version: true,
        warnings: true
      }
    };

    config.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ].concat(config.plugins);

    config.watch = true;

    for (let key in config.entry) {
      if (config.entry.hasOwnProperty(key)) {
        config.entry[key] = config.entry[key].concat([
          'webpack-hot-middleware/client'
        ]);
      }
    }
  }

  return config;
};
