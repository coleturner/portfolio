const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');

// App
const app = express();

// webpack
if (process.env.NODE_ENV !== 'production') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config')(null, {
    mode: process.env.NODE_ENV
  });
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      log: console.log // eslint-disable-line
    })
  );

  app.use(
    webpackHotMiddleware(compiler, {
      log: console.log, // eslint-disable-line
      reload: true
    })
  );
}

app.set('view engine', 'pug');
app.set('views', './views');
app.use(logger('dev'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'assets/icons/', 'favicon.ico')));

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

app.get('*', (req, res) => {
  res.send(404);
});

// error handler
app.use(require('./routes/errorHandler'));

console.log(`Now running @ http://localhost:${process.env.PORT}`); // eslint-disable-line

module.exports = app;
