var express = require('express');
const articleController = require('../controllers/vehiculeController')
var router = express.Router();


/* POST page. */
router.post('/addVehicule', articleController.addOn);


/* GET page. */
router.get('/', articleController.liste);

router.get('/vehicule/:id', articleController.show);

router.get('/addVehicule', articleController.add);

/*
router.get('/SingIn', function(req, res, next) {
  res.render('SingIn', { title: 'SingIn' })
});

router.get('/Login', function(req, res, next) {
  res.render('Login', { title: 'Login' });
});

*/

module.exports = router;
