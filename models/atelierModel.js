const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const atelierSchema  = new Schema({
      username: {
            type:String,
            required: true
      },
      fullname: {
            type:String,
            required: true
      },
      email: {
            type:String,
            required: true
      },
      password:String,
      createAt: {
            type:Date,
            default: Date.now()
      }
})

atelierSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Atelier', atelierSchema)