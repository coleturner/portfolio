const errorHandler = (err, req, res) => {
  console.warn('\x1b[41m\x1b[37mError\x1b[0m', err.message);

  res.locals = res.locals || {};

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('res', res);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
};

module.exports = errorHandler;
