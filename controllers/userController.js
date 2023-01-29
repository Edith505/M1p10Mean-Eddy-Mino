const User = require('../models/userModel')
const passport = require('passport');


module.exports ={
    signup: (req, res, next)=>{
       const newUser = User({
            username: req.body.username,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email
       })
       User.register(newUser, req.body.password, (err, user)=>{
            if(err){
                req.flash('error', err.message)
                return res.redirect('/usersignup')
            }
            passport.authenticate('local')(req,res,(err, newUser)=>{
                if(err){
                    req.flash('error', err.message)
                    return res.redirect('/usersignup')
                }
                req.flash('success', 'Bienvenu, vous êtes connecter')
                return res.redirect('/homePage')
            })
       })
    },
    login: (req, res, next)=>{
       const user = new User({
            username: req.body.username,
            password : req.body.password
       })
       req.login(user,(err)=>{
        if(err){
            req.flash('error', err.message)
            return res.redirect('/userlogin')
        }
        passport.authenticate('local',{failureRedirect: '/userlogin', failureFlash : 'Verifier votre username ou votre mot de passe'})(req,res,(err, user)=>{
            if(err){
                req.flash('error', err.message)
                return res.redirect('/userlogin')
            }
            req.flash('success', 'Hi, ravi de vous revoir')
            return res.redirect('/homePage')
        })
       })
    }
} 