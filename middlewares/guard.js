const passport = require('passport')
/*
exports.guard = (req, res,next)=>{
    if(!req.user){
        req.flash('warning', 'desolé, vous devrez vous authentifier')
        return res.redirect('/users/login')
    }
    next()
}
*/
module.exports = function isAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        // continue le processus de demande
        return next();
    }
    // sinon redirige l'utilisateur à la page de connexion
    res.redirect('/login');
}

