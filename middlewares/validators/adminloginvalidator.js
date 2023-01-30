const { Validator } = require('node-input-validator');


//validation de l'authentification de l'admin
const adminloginvalidator = (req, res, next)=>{

    const v = new Validator(req.body, {
        username:'required',
        password:'required',                                 
    })
   v.check().then((matched) => {
        if (!matched) {
            req.flash('errorForm', v.errors)
            return res.redirect('/users/adminlogin')
        }
        next()
    })
}
 
module.exports = adminloginvalidator;