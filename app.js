const compression = require('compression');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const Session = require('./middleware/Session');

/* Middle ware */
const ApiProxy = require('./middleware/ApiProxy.js');
const ImageProxy = require('./middleware/ImageProxy.js');

/* Routes */
const routes = require('./routes/index');
const embed = require('./routes/embed');

const app = express();
app.set('trust proxy', 'loopback');
app.use(compression());

if (process.env.NODE_ENV !== 'production') {
  app.use(logger('short'));
} else {
  app.use(logger('common'));
}

app.all('/ajax/*', ApiProxy);
app.use('/image', ImageProxy);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// uncomment after placing your favicon in /dist
// app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(Session.configSession());
app.use(Session.initSession);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'dist'),
  dest: path.join(__dirname, 'dist'),
  sourceMap: false
}));
app.use(express.static(path.join(__dirname, 'dist'), { maxAge: '1d' }));
app.use(express.static(path.join(__dirname, 'bower_components'), { maxAge: '1d' }));

app.use('/api', embed);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
