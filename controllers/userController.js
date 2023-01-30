const User = require('../models/userModel')
const passport = require('passport');
const randomToken = require('random-token');
const Reset = require('../models/reset')

/**
 * Code controllant l'authentification et l'inscription d'un utilisateur'
*/
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
    },
    resetPassword:(req, res, next)=>{
        User.findOne({username : req.body.username},(err,user)=>{
            if(err){
                req.flash('error', err.message)
                return res.redirect('/forgot-password')
            }
            if(!user){
                req.flash('error', 'Username non trouver')
                return res.redirect('/forgot-password')
            }
            //token qui dure 1h après a mise en place
            const token = randomToken(32)
            const reset = new Reset({
                username : req.body.username,
                resetPasswordToken : token,
                resetExpire : Date.now()+3600000
            })
            reset.save((err, reset)=>{
                if(err){
                    req.flash('error', err.message)
                    return res.redirect('/forgot-password')
                }
                //email reset
                req.body.email = user.email;
                req.body.message = "Salut "+user.username+"cliquer sur ce lien pour reinisialiser votre mot de passe :           <br>"+req.protocol+"://"+req.get('host')+"/forgot-password"+token;
                next()
            })
        })
    },

    /**
     * creation d'un token pour reinitialiser le mot de pase
     */
    resetPasswordForm:(req, res, next)=>{
        const token = req.params.token;
        Reset.find0ne({resetPasswordToken: token, resetExpire: {$gt: Date.now()}}, (err, reset)=>{
            if(err){
                req.flash('error', err.message)
                return res.redirect('/forgot-password')
            }
            if(!reset){
                req.flash('success', 'Reinisialiser votre mot de passe')
                return res.redirect('/reset-password')
            }
        })
    },

    /**verification d'un token s'il est encore valide */
    postRestPassword:(req, res, next)=>{
        const token = req.params.token;
        const password = req.body.password;
        Reset.find0ne({resetPasswordToken: token, resetExpire: {$gt: Date.now()}}, (err, reset)=>{
            if(err){
                req.flash('error', err.message)
                return res.redirect('/forgot-password')
            }
            if(!reset){
                req.flash('success', 'Reinisialiser votre mot de passe')
                return res.redirect('/reset-password')
            }
            User.findOne({username: reset.username},(err, user)=>{
                if(err){
                    req.flash('error', err.message)
                    return res.redirect('/forgot-password')
                }
                if(!reset){
                    req.flash('error', 'utilisateur non trouver')
                    return res.redirect('/reset-password')
                }
                user.setPassword(password, (err)=>{
                    req.flash('error', 'le mot de passe ne peut pas êtres changer')
                    return res.redirect('/forgot-password')
                })
                user.save();
                Reset.deleteMany({username: user.username}, (err, message)=>{
                    if(err){
                        console.log(err)
                    }
                    console.log(message)
                })

            })
            req.flash('success', 'votre mot de passe a bien été mis a jour')
            return res.redirect('/userlogin')
        })
    }
} 