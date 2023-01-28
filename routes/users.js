var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const loginValidator = require('../middlewares/validators/loginValidator');
const userValidator = require('../middlewares/validators/userValidator')


router.get('/login', (req, res) => {
  res.render('login', { title: 'login' })
});

router.post('/login',loginValidator, userController.login); 


router.get('/signup', (req, res) =>{
  res.render('signup', { title: 'signup' });
});

router.post('/signup',userValidator, userController.signup);
 /**DECONNECTION */
 router.get("/logout", (req, res) => {
  req.logout(err => {
    if(err) {
        console.log(err);
    }
    req.flash('success', 'vous etes deconnecter')
    res.redirect("/users/login");
    });
});

module.exports = router;
