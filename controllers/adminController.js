const passport = require('passport')
const Admin = require('../models/adminModel')

/**
 * Code controllant l'authentification et l'inscription de l'admin
*/
module.exports ={
    adminLogin :(req, res, next)=>{
        const admin = new Admin({
            username: req.body.username,
            password: req.body.password
        })
        //methode a s'authentifier imediatement après avoir reussi l'inscription
        req.login(admin, (err)=>{
            if(err){
                req.flash('error', err.message)
                return res.redirect('/users/adminlogin')
            }
            passport.authenticate('local')(req,res,(err, admin)=>{
                if(err){
                    req.flash('error', err.message)
                    return res.redirect('/users/adminlogin')
                }
                req.flash('success', 'Connection reussi')
                return res.redirect('/users/homeDashboard')
            })
        })
    },
    adminSignup :(req, res, next)=>{
        const newAdmin = Admin({
            username: req.body.username,
            email: req.body.email
        })

        //Enregistrer un nouveau admin et laisser passport gerer le mot de passe
        Admin.register(newAdmin, req.body.password, (err, admin)=>{
            if(err){
                req.flash('error', err.message)
                return res.redirect('/users/adminsignup')
            }
            passport.authenticate('local')(req,res,(err, newAdmin)=>{
                if(err){
                    req.flash('error', err.message)
                    return res.redirect('/users/adminsignup')
                }
                req.flash('success', 'Connection reussi')
                return res.redirect('/users/homeDashboard')
            })
        })
    }
}