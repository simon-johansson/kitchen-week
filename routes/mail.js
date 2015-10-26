
const express = require('express');
const router = express.Router();
const spreadsheet = require('../lib/spreadsheet');
const propagate = require('../lib/propagate');
const {
  reminderTemplate,
  statusTemplate,
  summaryTemplate
} = require('../lib/mail/templates');

const respond = (req, res, next, template) => {
  spreadsheet.getData((err, data) => {
    if (err) {
      var error = new Error(err);
      error.status = 500;
      return next(error);
    }
    template.render(data)
      .then( results => {
        res.send(results.html);
      });
  });
};

router.get('/reminder', (...args) => {
  respond(...args, reminderTemplate);
});

router.get('/status', (...args) => {
  respond(...args, statusTemplate);
});

router.get('/summary', (...args) => {
  respond(...args, summaryTemplate);
});

export default router;
