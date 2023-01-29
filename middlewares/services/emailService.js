const nodemailer = require('nodemailer')

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