const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const adminSchema  = new Schema({
      username: {
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

adminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Admin', adminSchema)