const { Validator } = require('node-input-validator');



//validation d'un ajout vehicule par le client
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
            req.flash('errorForm', v.errors)
            return res.redirect('/addVehicule')
        }
        next()
    })
}

module.exports = vehiculeValidator;