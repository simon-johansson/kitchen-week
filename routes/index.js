
var express = require('express');
var mail = require('../lib/mail');
var spreadsheet = require('../lib/spreadsheet');
var router = express.Router();

router.get('/', function(req, res) {
  spreadsheet.getData(function (error, data) {
    if(error){ return res.send(error); }

    res.render('index', data);
  });
});

router.post('/poke', function(req, res) {
  console.log(req.body.feedback);
  var addresses = req.body.emails.join(', ');
  mail.send(addresses, function (error, info) {
    if(error){
      return res.status(500).json({ error: 'Could not send email' });
    }
    console.log('Sent reminders to', addresses);
    res.json('Emails sent!');
  });
});

module.exports = router;
