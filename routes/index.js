var express = require('express');
const Vehicule = require('../models/vehiculModel')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 //res.render('index', { title: 'Express' });
  Vehicule.find()
  .then((vehicules)=>{
    res.status(200).json(vehicules);
  })
  .catch((err)=>{
    res.status(200).json(err)
  });
});

/* GET Singin page. */
router.get('/SingIn', function(req, res, next) {
  res.render('SingIn', { title: 'SingIn' });
});

/* GET Singin page. */
router.get('/Login', function(req, res, next) {
  res.render('Login', { title: 'Login' });
});


module.exports = router;
