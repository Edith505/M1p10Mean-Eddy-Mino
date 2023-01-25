const { Validator } = require('node-input-validator');

const userValidator = (req, res, next)=>{
    const v = new Validator(req.body, {
        username:'required',
        fullname:'required',
        email:'required|email',
        password:'required',  
        cpassword:'required|same:password',                                          
    })
    v.check().then((matched) => {
        if (!matched) {
            req.flash('errorForm', v.errors)
            return res.redirect('/signup')
        }
        next()
    })
}

module.exports = userValidator;