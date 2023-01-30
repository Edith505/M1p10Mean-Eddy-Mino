const { Validator } = require('node-input-validator');


//validation de l'inscription de l'admin
const adminValidator = (req, res, next)=>{

    const v = new Validator(req.body, {
        username:'required',
        email:'required|email',
        password:'required',  
        cpassword:'required|same:password'                                          
    })
   v.check().then((matched) => {
        if (!matched) {
            req.flash('errorForm', v.errors)
            return res.redirect('/users/adminsignup')
        }
        next()
    })
}
 
module.exports = adminValidator;