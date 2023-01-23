var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const Model = require('./models/model')
const bodyParser = require('body-parser')
//const Vehicule = require('./models/vehiculModel')

//connexion a mongoose
mongoose.connect('mongodb://127.0.0.1:27017/AuthentificationDb', {UseNewUrlParser: true, UseUnifiedTopology: true})
.then(()=>console.log("ConnectedSuccessful"))
.catch(()=>console.log("Error in the Connection"));


/**for (let index = 0; index < 10; index++) {
 //creez un vehicule
var vehicule = new Vehicule({
  Proprietaire: "Monsieur" + index,
  image:"http://localhost:3000/public/images/vehicule.jpg",
  model:"Vl" ,
  type: "VG",
  anne: 2000 + index,
  description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." + index,
  depot: Date.now()
})
//sauvegarder un vehicule
vehicule.save()
.then(()=>console.log("sauvegarde reussi"))
.catch(()=>console.log("sauvegarde echoue"));
 
}
for (let index = 0; index < 5; index++) {
  //creez un type
 var model = new Model({
    option:'Model '+index
 })
 //sauvegarder un type
//model.save()
 .then(()=>console.log("sauvegarde reussi"))
 .catch(()=>console.log("sauvegarde echoue"));
   
 }*/ 


//Importation des router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


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
