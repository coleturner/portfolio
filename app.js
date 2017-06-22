const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon')

// App
const app = express();

// webpack
if (process.env.NODE_ENV !== 'production') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    log: console.log
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    reload: true
  }));
}

app.set('view engine', 'pug');
app.set('views', './views');
app.use(logger('dev'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'assets/icons/', 'favicon.ico')))

app.use((req, res, next) => {
  res.locals = {
    manifestAsset: require('./util/manifestAsset'),
    renderReact: require('./util/renderReact')
  };

  next();
});
const indexRoute = require('./routes/index');
const resumeRoute = require('./routes/resume');
app.get('/', indexRoute);
app.get('/resume', resumeRoute);

// error handler
app.use(require('./routes/errorHandler'));

module.exports = app;
