var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var express = require('express');
var proxy = require('express-http-proxy');
var app = express();
var proxyReq = require('./proxy').proxyReq;

var authHost = "http://127.0.0.1:8081"
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());

app.use('/', express.static('app/build'));
// proxy request start with /user to 10.0.0.236:8080
app.use('/user', proxyReq);

// auth api 
app.use('/auth', proxy(authHost));
// app.use('/user', proxy('127.0.0.1:8888'));

module.exports = app;
