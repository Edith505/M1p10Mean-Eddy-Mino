var express = require('express');
const multer = require('multer');
const vehiculeController = require('../controllers/vehiculeController');
const multerConfig = require('../middlewares/multerConfig');
const isAuthenticated = require('../middlewares/guard');
var router = express.Router();
const vehiculeValidator = require('../middlewares/validators/vehiculeValidator');


/* POST page. */
router.post('/addVehicule',multerConfig, vehiculeValidator, vehiculeController.addOn);


/* GET page. */
router.get('/listeVehicule', vehiculeController.liste);

router.get('/vehicule/:id', vehiculeController.show);

router.get('/addVehicule', vehiculeController.add);

router.get('/', (req, res, next) =>{
  res.render('index', { title: 'Home' })
});

router.get('/homeDashboard',isAuthenticated,(req, res, next)=> {
  res.render('homeDashboard', { title: 'Admin' })
});

router.get('/dashboard',isAuthenticated, (req, res, next)=> {
  res.render('dashboard', { title: 'Dashboard' });
});

module.exports = router;
