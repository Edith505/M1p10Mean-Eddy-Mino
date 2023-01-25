var express = require('express');
var router = express.Router();


router.get('/login', (req, res) => {
  res.render('login', { title: 'login' })
});

router.get('/signup', (req, res) =>  {
  res.render('signup', { title: 'signup' });
});

module.exports = router;
