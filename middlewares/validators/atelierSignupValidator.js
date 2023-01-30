const { Validator } = require('node-input-validator');



//validation de l'authentification d'un atelier
const atelierSignupValidator = (req, res, next)=>{

    const v = new Validator(req.body, {
        username:'required',
        fullname:'required',
        password:'required',  
        cpassword:'required|same:password'                                          
    })
   v.check().then((matched) => {
        if (!matched) {
            req.flash('errorForm', v.errors)
            return res.redirect('/users/ateliersignup')
        }
        next()
    })
}
 
module.exports = atelierSignupValidator;