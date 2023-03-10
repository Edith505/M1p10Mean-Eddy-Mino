var createError = require('http-errors');
const dotenv = require('dotenv').config();
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
const User = require('./models/userModel')
const Admin = require('./models/adminModel')
const Atelier = require('./models/atelierModel')


var app = express();
//connexion a mongoose
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE, {UseNewUrlParser: true, UseUnifiedTopology: true})
.then(()=>console.log("ConnectedSuccessful"))
.catch(()=>console.log("Error in the Connection"));



//SESSION
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

//FLASH
app.use(flash());

app.use((req,res,next)=>{
  if(req.user){
    res.locals.user = req.user;
  }
  if(req.admin){
    res.locals.user = req.admin;
  }
  if(req.atelier){
    res.locals.user = req.atelier;
  }
  res.locals.error = req.flash('error')
  res.locals.warning = req.flash('warning')
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
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(Admin.createStrategy())
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

passport.use(Atelier.createStrategy())
passport.serializeUser(Atelier.serializeUser());
passport.deserializeUser(Atelier.deserializeUser());


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
