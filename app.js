const express = require('express');
const path = require('path');
const pug = require('pug');
const logger = require('morgan');
const favicon = require('serve-favicon')

// App
const app = express();

// webpack
if (process.env.NODE_ENV !== 'production') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack/config');
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
    renderReact: (component, props = {}) => {
      const id = Math.random().toString(36).substr(2, 10);
      return pug.render('div(class="react-component" id=id data-props=props data-react=true data-component=component)', {
        component,
        id,
        props
      });
    }
  };

  next();
});
const indexRoute = require('./routes/index');
const resumeRoute = require('./routes/resume');
app.get('/', indexRoute);
app.get('/resume', resumeRoute);

// error handler
app.use((err, req, res, next) => {
  console.warn('\x1b[41m\x1b[37mError\x1b[0m', err.message);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
