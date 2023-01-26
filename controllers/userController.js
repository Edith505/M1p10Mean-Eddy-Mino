const User = require('../models/userModel')
const passport = require('passport');


module.exports ={
    signup: (req, res, next)=>{
       const newUser = User({
            username: req.body.username,
            fullname : req.body.fullname,
            email : req.body.email
       })
       User.register(newUser, req.body.password, (err, user)=>{
            if(err){
                req.flash('error', err.message)
                return res.redirect('/users/signup')
            }
            passport.authenticate('local',{failureRedirect: '/users/signup'})(req,res,(err, newUser)=>{
                if(err){
                    req.flash('error', err.message)
                    return res.redirect('/users/signup')
                }
                req.flash('success', 'Bienvenu, vous êtes connecter')
                return res.redirect('/homeDashboard')
            })
       })
    },
    login: (req, res, next)=>{
       
    }
} 