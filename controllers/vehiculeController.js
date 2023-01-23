const Vehicule = require('../models/vehiculModel')
const Model = require('../models/model');

exports.liste = (req,res)=>{
       Vehicule.find()
      .then((vehicules)=>{
            res.render('listeVehicule', { title: 'listeVehicule', 'vehicules': vehicules})
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
            image:req.file.filename,
            depot: Date.now()
     })
     vehicule.save((err, vehicule)=>{
      if (err) {
            Model.find()
            .then((models)=>{
                  res.render('addVehicule', {models :models, error:"Envoie echouée, veuillez verifier les champs"})
            })
            .catch(()=>{
                  res.redirect('/')
            }); 
      }
      else{
            Model.find()
            .then((models)=>{
                  res.render('addVehicule', {models :models, success:"Votre Vehicule a été bien enregistrer"}) 
            })
            .catch(()=>{
                  res.redirect('/')
            });   
      }
     })
}