const { Validator } = require('node-input-validator');

//validation de l'authentification d'un utilisateur
const userValidator = (req, res, next)=>{

    const v = new Validator(req.body, {
        username:'required',
        firstname:'required',
        lastname:'required',
        email:'required|email',
        password:'required',  
        cpassword:'required|same:password'                                          
    })
   v.check().then((matched) => {
        if (!matched) {
            req.flash('errorForm', v.errors)
            return res.redirect('/usersignup')
        }
        next()
    })
}
 
module.exports = userValidator;