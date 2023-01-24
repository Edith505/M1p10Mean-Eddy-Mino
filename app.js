var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//const Marque = require('./models/marque')

//connexion a mongoose
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/AuthentificationDb', {UseNewUrlParser: true, UseUnifiedTopology: true})
.then(()=>console.log("ConnectedSuccessful"))
.catch(()=>console.log("Error in the Connection"));

//Importation des router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
/*
for (let index = 0; index < 8; index++) {
  marque = new Marque({
    option : 'marque '+index,
  })
  marque.save()
}
*/
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
