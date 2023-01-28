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
       const user = new User({
            username: req.body.username,
            password : req.body.password
       })
       req.login(user,(err)=>{
        if(err){
            req.flash('error', err.message)
            return res.redirect('/users/login')
        }
        passport.authenticate('local',{failureRedirect: '/users/login'})(req,res,(err, user)=>{
            if(err){
                req.flash('error', err.message)
                return res.redirect('/users/login')
            }
            req.flash('success', 'Hi, ravi de vous revoir')
            return res.redirect('/homeDashboard')
        })
       })
    }
} 