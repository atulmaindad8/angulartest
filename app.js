var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');

var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/angulartask', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

var apiRouter = require('./routes/user');

var app = express();
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/angulartask')));
app.use('/', express.static(path.join(__dirname, 'dist/angulartask')));
app.use('/api', apiRouter);

module.exports = app;