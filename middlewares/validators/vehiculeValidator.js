const { Validator } = require('node-input-validator');

const vehiculeValidator = (req, res, next)=>{
    const v = new Validator(req.body, {
        Proprietaire:'required',
        image:'size:1mb,20mb',
        marque:'required',
        anne:'required' ,                                             
        description:'required'
    })
    v.check().then((matched) => {
        if (!matched) {
            req.flash('errorFormVehicule', v.errors)
            return res.redirect('/addVehicule')
        }
        next()
    })
}

module.exports = vehiculeValidator;