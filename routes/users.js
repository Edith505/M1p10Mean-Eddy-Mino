var express = require('express');
var router = express.Router();
const vehiculeController = require('../controllers/vehiculeController');
const adminController = require('../controllers/adminController')
const adminValidator = require('../middlewares/validators/adminvalidator')
const adminloginvalidator = require('../middlewares/validators/adminloginvalidator')
const atelierSignupValidator = require('../middlewares/validators/atelierSignupValidator')
const atelierController = require('../controllers/atelierController')
const atelierLoginValidator = require('../middlewares/validators/atelierLoginValidator')



/**
 * route /users
*/
router.get('/listeVehicule', vehiculeController.liste);

router.get('/vehicule/:id', vehiculeController.show);

router.get('/homeDashboard',(req, res, next)=> {
  res.render('homeDashboard', { title: 'Admin' })
});

router.get('/dashboard',(req, res, next)=> {
  res.render('dashboard', { title: 'Dashboard' });
});


router.get('/adminlogin', (req, res) => {
  res.render('adminlogin', { title: 'adminlogin' })
});

router.post('/adminlogin',adminloginvalidator, adminController.adminLogin);

router.get('/adminsignup', (req, res) =>{
  res.render('adminsignup', { title: 'adminsignup' });
});

router.post('/adminsignup',adminValidator, adminController.adminSignup);

/** ROUTE ATELIER **/
router.get('/atelierLogin', (req, res) => {
  res.render('atelierLogin', { title: 'atelierLogin' })
});

router.get('/ateliersignup', (req, res) => {
  res.render('ateliersignup', { title: 'ateliersignup' })
});

router.get('/atelierDashboard', (req, res) => {
  res.render('atelierDashboard', { title: 'atelierDashboard' })
});

router.post('/ateliersignup',atelierSignupValidator, atelierController.atelierSignup)

router.post('/atelierLogin',atelierLoginValidator, atelierController.atelierLogin)
/**deconnection admin*/
 
 router.get("/logout", (req, res) => {
  req.logout(err => {
    if(err) {
        console.log(err);
    }
    req.flash('success', 'vous etes deconnecter')
    res.redirect("/users/adminlogin");
    });
});

/**deconnection admin*/
router.get("/dec", (req, res) => {
  req.logout(err => {
    if(err) {
        console.log(err);
    }
    req.flash('success', 'vous etes deconnecter')
    res.redirect("/users/atelierLogin");
    });
});

module.exports = router;
