const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarqueSchema = new Schema({
      option:String
})

module.exports = mongoose.model('Marque', MarqueSchema)