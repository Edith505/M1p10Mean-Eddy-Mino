const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehiculeSchema = new Schema({
      Proprietaire:{
            type:String,
            required: true
      },
      image : {
            type:String,
            required: true
      },
      marque: {
            type:String,
            required: true,
            min: 4,
            max: 4
      },
      anne:{
            type:String,
            required: true,

      },                                                  
      description: {
            type:String,
            required: true
      },
      author:{
            type: Schema.Types.ObjectId,
            ref: 'User'
      },
      depot:{
            type:Date,
            default: Date.now()
      }
})

module.exports = mongoose.model('Vehicule', vehiculeSchema)