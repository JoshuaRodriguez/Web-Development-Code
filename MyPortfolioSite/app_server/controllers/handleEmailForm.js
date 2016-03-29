var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport')

module.exports.email = function(req, res) {
    var mailOpts, smtpTrans;

    smtpTrans = nodemailer.createTransport(smtpTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        auth: {
            user: 'joshuarodriguezsantiago@outlook.com',
            pass: 'ejsqtgibekszslhp'
        }
    }));

    mailOpts = {
        from: req.body.name + ' <' + req.body.email + '>',
        to: 'joshuarodriguezsantiago@outlook.com',
        subject: 'Message from joshua-rodriguez.com',
        text: 'Contact Information: ' + req.body.name + ' <' + req.body.email + '>' + '<' + req.body.phone + '>' + '\n\n' + req.body.message
    };

    smtpTrans.sendMail(mailOpts, function(error, response) {
        if(error) {
            res.status(404).send('Mail server not responding');
        } else {
            res.status(200).send('Sent message successfully');
        }
    });
};