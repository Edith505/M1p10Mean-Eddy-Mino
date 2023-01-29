var express = require('express');
var router = express.Router();



router.get('/login', (req, res) => {
  res.render('login', { title: 'login' })
});

router.get('/signup', (req, res) =>{
  res.render('signup', { title: 'signup' });
});
/*
router.post('/login',adminValidator, userController.login); 


router.get('/signup', (req, res) =>{
  res.render('signup', { title: 'signup' });
});

router.post('/signup',adminValidator, userController.signup);

 /**DECONNECTION 
 router.get("/logout", (req, res) => {
  req.logout(err => {
    if(err) {
        console.log(err);
    }
    req.flash('success', 'vous etes deconnecter')
    res.redirect("/users/login");
    });
});*/


module.exports = router;
