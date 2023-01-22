const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehiculeShema = new Schema({
      Proprietaire:String,
      image : String,
      model: String,
      type: String,
      anne: Number,
      description: String,
      depot:{
            type:Date,
            default: Date.now()
      }
})

module.exports = mongoose.model('Vehicule', vehiculeShema)