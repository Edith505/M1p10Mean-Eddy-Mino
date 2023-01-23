const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSchema = new Schema({
      option:String
})

module.exports = mongoose.model('Model', ModelSchema)