
const express = require('express');
const mail = require('../lib/mail');
const spreadsheet = require('../lib/spreadsheet');
const propagate = require('../lib/propagate');
const router = express.Router();

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

router.get('/', (req, res, next) => {
  spreadsheet.getData((err, data) => {
    if (err) {
      var error = new Error(err);
      error.status = 500;
      return next(error);
    }
    res.render('index', data);
  });
});

router.post('/positive', (req, res)  => {
  spreadsheet.addPositive(err => {
    if (err) {
      return res.status(500).json({ error: 'Could not set feeback' });
    }
    res.json('Positive response recived');
  });
});

router.post('/negative', (req, res)  => {
  spreadsheet.addNegative(err  => {
    if (err) {
      return res.status(500).json({ error: 'Could not set feeback' });
    }
    res.json('Negative response recived');
  });
});

export default router;
