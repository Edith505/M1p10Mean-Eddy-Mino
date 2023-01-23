const Vehicule = require('../models/vehiculModel')
const Model = require('../models/model');

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

exports.add = (req, res)=>{
      Model.find()
      .then((models)=>{
            res.render('addVehicule', {models: models})
          })
          .catch((err)=>{
            res.redirect('/');
          });
}

exports.addOn = (req, res)=>{
     var vehicule = new Vehicule({
            ...req.body,
            depot: Date.now()
     })
     vehicule.save()
     .then(()=>{
      res.render('addVehicule', {succes:"Votre Vehicule a été bien enregistrer"})
     })
     .catch(()=>{
      res.render('addVehicule', {error:"Echoue de l'ajout d'un voiture"})
     })
}