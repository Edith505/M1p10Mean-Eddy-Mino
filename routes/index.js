var express = require('express');
const vehiculeController = require('../controllers/vehiculeController')
var router = express.Router();


/* POST page. */
router.post('/addVehicule', vehiculeController.addOn);


/* GET page. */
router.get('/listeVehicule', vehiculeController.liste);

router.get('/vehicule/:id', vehiculeController.show);

router.get('/addVehicule', vehiculeController.add);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' })
});

router.get('/SingIn', function(req, res, next) {
  res.render('SingIn', { title: 'SingIn' })
});

router.get('/Login', function(req, res, next) {
  res.render('Login', { title: 'Login' });
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});

module.exports = router;
