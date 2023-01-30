const passport = require('passport')
const Atelier = require('../models/atelierModel')

/**
 * Code controllant l'authentification et l'inscription de l'atelier
*/
module.exports ={
    atelierLogin :(req, res, next)=>{
        const atelier = new Atelier({
            username: req.body.username,
            password: req.body.password
        })
        //methode a s'authentifier imediatement après avoir reussi l'inscription
        req.login(atelier, (err)=>{
            if(err){
                req.flash('error', err.message)
                return res.redirect('/users/atelierLogin')
            }
            passport.authenticate('local')(req,res,(err, atelier)=>{
                if(err){
                    req.flash('error', err.message)
                    return res.redirect('/users/atelierLogin')
                }
                req.flash('success', 'Connection reussi')
                return res.redirect('/users/atelierDashboard')
            })
        })
    },
    atelierSignup :(req, res, next)=>{
        const newAtelier = Atelier({
            username: req.body.username,
            fullname: req.body.fullname,
            email: req.body.email
        })

        //Enregistrer un nouveau atelier et laisser passport gerer le mot de passe
        Atelier.register(newAtelier, req.body.password, (err, atelier)=>{
            if(err){
                req.flash('error', err.message)
                return res.redirect('/users/ateliersignup')
            }
            passport.authenticate('local')(req,res,(err, newAtelier)=>{
                if(err){
                    req.flash('error', err.message)
                    return res.redirect('/users/ateliersignup')
                }
                req.flash('success', 'Connection reussi')
                return res.redirect('/users/atelierDashboard')
            })
        })
    }
}