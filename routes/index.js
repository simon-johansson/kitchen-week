
var express = require('express');
var mail = require('../lib/mail');
var spreadsheet = require('../lib/spreadsheet');
var router = express.Router();

var propagate = function (onErr, onSuccess) {
  return function(err) {
    if (err) {
      // return onErr(err);
      return res.status(500).json(err);
    } else {
      var slice = Array.prototype.slice;
      var rest = slice.call(arguments, 1);
      return onSuccess.apply(this, rest);
    }
  }
};

router.get('/', function(req, res) {
  spreadsheet.getData(function (error, data) {
    if(error){ return res.send(error); }
    res.render('index', data);
  });
});

// router.post('/poke', function(req, res) {
//   var addresses = req.body.emails.join(', ');

//   mail.send(addresses, function (error, info) {
//     if(error){
//       return res.status(500).json({ error: 'Could not send email' });
//     }
//     console.log('Sent reminders to', addresses);
//     res.json('Emails sent!');
//   });
// });

router.post('/positive', function(req, res) {
  spreadsheet.addPositive(propagate(res, function () {
    res.json('Positive response recived');
  }));
});

router.post('/negative', function(req, res) {
  spreadsheet.addNegative(propagate(res, function () {
    res.json('Negative response recived');
  }));
});

module.exports = router;
