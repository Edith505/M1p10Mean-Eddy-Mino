var express = require('express');
const multer = require('multer');
const vehiculeController = require('../controllers/vehiculeController');
const multerConfig = require('../middlewares/multerConfig');
const isAuthenticated = require('../middlewares/guard');
var router = express.Router();
const vehiculeValidator = require('../middlewares/validators/vehiculeValidator');
const userController = require('../controllers/userController');
const userValidator = require('../middlewares/validators/userValidator');
const loginValidator = require('../middlewares/validators/loginValidator');
const sendRestMail = require('../middlewares/services/emailService');
const resetValidator = require('../middlewares/validators/resetvalidator');


/* POST page. */
router.post('/addVehicule',multerConfig, vehiculeValidator, vehiculeController.addOn);


/* GET page. */
router.get('/listeVehicule', vehiculeController.liste);

router.get('/vehicule/:id', vehiculeController.show);

router.get('/addVehicule', vehiculeController.add);

router.get('/', (req, res, next) =>{
  res.render('index', { title: 'index' })
});

router.get('/homePage',isAuthenticated, (req, res, next) =>{
  res.render('homePage', { title: 'Home' })
});

router.get('/homeDashboard',isAuthenticated,(req, res, next)=> {
  res.render('homeDashboard', { title: 'Admin' })
});

router.get('/dashboard',isAuthenticated, (req, res, next)=> {
  res.render('dashboard', { title: 'Dashboard' });
});

//route pour qu'un utilisateur puisse s'inscrire
router.get('/usersignup', (req, res) => {
  res.render('usersignup', { title: 'usersignup' })
});
router.post('/usersignup',userValidator, userController.signup);
 

//route pour qu'un utilisateur puisse s'authentifier
router.get('/userlogin', (req, res) =>{
  res.render('userlogin', { title: 'userlogin' });
});
router.post('/userlogin',loginValidator, userController.login);

//reinisialisation mot de passe
router.get('/forgot-password',(req, res)=>{
  res.render('forgot-password')
})

router.post('/forgot-password', userController.resetPassword, sendRestMail)


 /**DECONNECTION */
 router.get('/logout', (req, res) => {
  req.logout(err => {
    if(err) {
        console.log(err);
    }
    req.flash('success', 'vous etes deconnecter')
    res.redirect("/userlogin");
    });
});
router.get('/reset-password/:token', userController.resetPasswordForm)

router.get('/reset-password/:token', userController.resetPasswordForm)

router.post('/reset-password/:token', resetValidator, userController.postRestPassword)

router.post('/usersignup',userValidator, userController.signup);

module.exports = router;
