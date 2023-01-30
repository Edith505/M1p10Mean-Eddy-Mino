const nodemailer = require('nodemailer')


/**
 *Fonction d'envoie d'email.
 Il est a noter d'utiliser un email valid sur 'user' et le password sur 'pass'
 parfois le service de gmail n'autorise pas la connection brutal avec les identifiants.
 Il faut donc activer dans gerer mon compte => securité => activer autoriser application tierces 
 */
const sendRestMail = (req, res, next)=>{
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mailadmin',
          pass: 'mdp'
        }
    })
    var message = "<br>Message :"+req.body.message;
    var mailOptions = {
        form : 'mailadmin',
        to : req.body.email,
        subject : 'Reset your password',
        html: message
    }
              /*creation d'une fonction qui envoi le mail */
    transporter.sendMail(mailOptions, (err, infos)=>{
        if (err) {
          console.log(err);
          req.flash('err', err.message)
          return res.redirect('/forgot-password')
        } else {
          console.log(infos);
          req.flash('success', 'Email sent: ' +req.body.email+'Check your mailbox')
          return res.redirect('/forgot-password')
        }
    })
}

module.exports = sendRestMail;