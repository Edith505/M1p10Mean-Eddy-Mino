const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel  = new Schema({
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
      password: {
            type:String,
            required: true
      },
      createAt: {
            type:Date,
            default: Date.now()
      }
})

module.exports = mongoose.model('User', userModel)