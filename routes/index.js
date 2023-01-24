var express = require('express');
const multer = require('multer');
const vehiculeController = require('../controllers/vehiculeController');
const multerConfig = require('../middlewares/multerConfig');
var router = express.Router();
const vehiculeValidator = require('../middlewares/validators/vehiculeValidator');


/* POST page. */
router.post('/addVehicule',multerConfig, vehiculeValidator, vehiculeController.addOn);


/* GET page. */
router.get('/listeVehicule', vehiculeController.liste);

router.get('/vehicule/:id', vehiculeController.show);

router.get('/addVehicule', vehiculeController.add);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' })
});

router.get('/homeDashboard', function(req, res, next) {
  res.render('homeDashboard', { title: 'Admin' })
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
