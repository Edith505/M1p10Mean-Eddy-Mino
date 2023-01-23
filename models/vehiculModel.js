const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehiculeShema = new Schema({
      Proprietaire:{
            type:String,
            required: true
      },
      image : {
            type:String,
            required: true
      },
      model: {
            type:String,
            required: true
      },
      anne:{
            type:String,
            required: true
      },                                                  
      description: {
            type:String,
            required: true
      },
      depot:{
            type:Date,
            default: Date.now()
      }
})

module.exports = mongoose.model('Vehicule', vehiculeShema)