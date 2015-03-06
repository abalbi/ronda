var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var parseurl = require('parseurl')
var session = require('express-session')
var auth = require('./lib/auth');

var routes = require('./routes/index');
var api = require('./routes/api');
var users = require('./routes/api/users');
var goods = require('./routes/api/goods');

var app = express();

mongoose.connect('mongodb://localhost:27017/ronda');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(session({
  secret: 'R0ND4',
  resave: false,
  saveUninitialized: true
}))
app.use(auth.checkAccessTokenSession)

app.use('/', routes);
app.use('/api', api);
app.use('/api/users', users);
app.use('/api/goods', goods);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
