var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var session = require('express-session')
var flash = require('connect-flash');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passport = require('passport')
const User = require('./models/userModel');


var app = express();
//connexion a mongoose
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/AuthentificationDb', {UseNewUrlParser: true, UseUnifiedTopology: true})
.then(()=>console.log("ConnectedSuccessful"))
.catch(()=>console.log("Error in the Connection"));



//SESSION
app.use(session({
  secret: 'JIfrL0rUfrosTmIclWa',
  resave: false,
  saveUninitialized: false
}))

//FLASH
app.use(flash());
app.use((req,res,next)=>{
  if(req.user){
    res.locals.user = req.user;
  }
  res.locals.error = req.flash('error')
  res.locals.success = req.flash('success')
  res.locals.errorForm = req.flash('errorForm')
  next()
})



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
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
