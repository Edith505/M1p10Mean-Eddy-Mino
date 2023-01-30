const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema  = new Schema({
      username: {
            type:String,
            required: true
      },
      firstname: {
            type:String,
            required: true
      },
      lastname: {
            type:String,
            required: true
      },
      email: {
            type:String,
            required: true
      },
      password:String,
      vehicules: Array,
      createAt: {
            type:Date,
            default: Date.now()
      }
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema)