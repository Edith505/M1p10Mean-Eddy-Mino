const express = require("express");
const router = express.Router();

// GET Home page
router.get('/', (req, res) =>{
    res.render('index', {title: "Home Page"});
}) 

// GET contact page
router.get('/contact', (req, res) =>{
    res.render('contact', {title: "Contact Page"});
})

module.exports = router;