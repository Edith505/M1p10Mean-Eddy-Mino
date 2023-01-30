const { Validator } = require('node-input-validator');


//validation de la reinitialisation de mdp
const resetValidator = (req, res, next)=>{

    const v = new Validator(req.body, {
        password:'required',  
        cpassword:'required|same:password'                                          
    })
   v.check().then((matched) => {
        if (!matched) {
            req.flash('errorForm', v.errors)
            return res.redirect('/'+req.path)
        }
        next()
    })
}
 
module.exports = resetValidator;