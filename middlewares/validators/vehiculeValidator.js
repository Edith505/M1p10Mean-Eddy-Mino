const { Validator } = require('node-input-validator');

const vehiculeValidator = (req, res, next)=>{
    if(req.file){
        req.body.image = req.file.filename
    }
    const v = new Validator(req.body, {
        Proprietaire:'required',
        image:'required',
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