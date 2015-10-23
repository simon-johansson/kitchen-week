
var nodemailer = require('nodemailer');
var mandrillTransport = require('nodemailer-mandrill-transport');

var transporter = nodemailer.createTransport(mandrillTransport({
  auth: {
    apiKey: 'rBbQZnxJ9EXIZf6ma1yvQw'
  }
}));

// var transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'sijoh006@gmail.com',
//     pass: 'arjmGBa1y4'
//   }
// });

var mailOptions = {
  from: 'Kitchen ✔ <kitchen@screeninteraction.com>', // sender address
  subject: 'Kitchen is dirty... 👺', // Subject line
  text: 'It´s your kitchen week, please clean the dishes! 💩', // plaintext body
  // html: '<b>Hello world ✔</b>' // html body
};

module.exports = {
  send: function(receivers, callback) {
    mailOptions.to = receivers;
  //   transporter.sendMail(mailOptions, function(error, info) {
  //     if (error) {
  //       return callback(error);
  //     }
  //     callback(null, 'Message sent: ' + info.response);
  //   });
  }
};
