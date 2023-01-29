const passport = require('passport')

module.exports = function isAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        // continue le processus de demande
        return next();
    }
    // sinon redirige l'utilisateur à la page de connexion
    res.redirect('/userlogin');
}

