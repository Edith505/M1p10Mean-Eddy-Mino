const Vehicule = require('../models/vehiculModel')
const Marque = require('../models/marque');


/**
 * Code controllant la liste des vehicules
*/
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
      Marque.find()
      .then((marques)=>{
            res.render('addVehicule', {marques: marques})
          })
          .catch((err)=>{
            res.redirect('/');
          });
}

/**ajouter l'image du vehicule en local pour povoir l'afficher après */
exports.addOn = (req, res)=>{
     var vehicule = new Vehicule({
            ...req.body,
            image: `${req.protocol}://${req.get('host')}/images/vehiculesPicture/${req.file.filename}`,
            depot: Date.now()
     })
     vehicule.save((err, vehicule)=>{
      if (err) {
            req.flash('error', 'Veuillez verifier les informations')
            return res.redirect('/addVehicule')
      }
      req.flash('success','Votre vehicule a été enregistrer')
      return res.redirect('/addVehicule')
     })
}