
var nodemailer = require('nodemailer');
var mandrillTransport = require('nodemailer-mandrill-transport');
var config = require('../config');

var transporter = nodemailer.createTransport(mandrillTransport({
  auth: {
    apiKey: config.keys.mandrill
  }
}));

var mailOptions = {
  from: 'Kitchen ✔ <'+ config.texts.fromEmail +'>', // sender address
  subject: 'Kitchen is dirty... 👺', // Subject line
  // text: 'It´s your kitchen week, please clean the dishes! 💩', // plaintext body
  // html: '<b>Hello world ✔</b>' // html body
};

module.exports = {
  send: function(receivers, callback) {
    // mailOptions.to = receivers;
    mailOptions.to = 'simon.johansson@screeninteraction.com';
  //   transporter.sendMail(mailOptions, function(err, info) {
  //     if (err) {
  //       return callback(err);
  //     }
  //     callback(null, 'Message sent: ' + info.response);
  //   });
  },
  sendReminderEmail: function (data) {
    var addresses = utils.concatEmails(data.thisWeek.emails);
    // mailOptions.to = addresses;
    mailOptions.to = 'simon.johansson@screeninteraction.com';
    mailOptions.subject = 'It´s your kitchen week this week!';
    mailOptions.html = '<b>Give it your best!</b>';

    transporter.sendMail(mailOptions, function(err, info) {
      if (err) { return callback(err); }
      callback(null, 'Message sent: ' + info.response);
    });
  }
};
