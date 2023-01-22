//const Vehicule = require('../models/vehiculModel')
const Vehicule = require('../models/vehiculModel')

exports.liste = (req,res)=>{
      //res.render('index', { title: 'Express' });
       Vehicule.find()
      .then((vehicules)=>{
            res.render('index', { title: 'Home', 'vehicules': vehicules})
    //res.status(200).json(vehicules);
      })
      .catch((err)=>{
            res.status(200).json(err)
      });
}

exports.show = (req,res) =>{
      Vehicule.findOne({_id: req.params.id})
      .then((vehicule)=>{
        res.render('viewVehicule', {vehicule: vehicule})
      })
      .catch((err)=>{
        res.redirect('/')
      });
}
