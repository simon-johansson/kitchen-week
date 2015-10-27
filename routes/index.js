
const express = require('express');
const mail = require('../lib/mail');
const spreadsheet = require('../lib/spreadsheet');
const propagate = require('../lib/propagate');
const router = express.Router();

router.get('/', (req, res, next) => {
  spreadsheet.getData((err, data) => {
    if (err) {
      let error = new Error(err);
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
