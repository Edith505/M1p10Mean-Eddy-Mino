var express = require('express');
const articleController = require('../controllers/vehiculeController')
var router = express.Router();

/* GET home page. */
router.get('/', articleController.liste)

router.get('/vehicule/:id', articleController.show)


/* GET Singin page. */
router.get('/SingIn', function(req, res, next) {
  res.render('SingIn', { title: 'SingIn' })
});

/* GET Singin page. */
router.get('/Login', function(req, res, next) {
  res.render('Login', { title: 'Login' });
});




module.exports = router;
