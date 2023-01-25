const User = require('../models/userModel')


module.exports ={
    signup: (req, res, next)=>{
        const newUser = User({
            ...req.body,
        })
        console.log(newUser)
    },
    login: ()=>{

    }
} 