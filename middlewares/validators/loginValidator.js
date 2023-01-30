const { Validator } = require('node-input-validator');


//validation de l'authentification 'un client
const loginValidator = (req, res, next)=>{

    const v = new Validator(req.body, {
        username:'required',
        password:'required'                              
    })
   v.check().then((matched) => {
        if (!matched) {
            req.flash('errorForm', v.errors)
            return res.redirect('/userlogin')
        }
        next()
    })
}

module.exports = loginValidator;