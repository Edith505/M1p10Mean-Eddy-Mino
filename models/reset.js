const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const resetSchema  = new Schema({
      username: {
            type:String,
            required: true
      },
      resetPasswordToken: {
            type:String,
            required: true
      },
      resetExpire:{
            type:Number,
            required: true
      },
      createAt: {
            type:Date,
            default: Date.now()
      }
})

resetSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Reset', resetSchema)