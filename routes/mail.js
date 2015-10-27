
const async = require('async');
const express = require('express');
const router = express.Router();
const spreadsheet = require('../lib/spreadsheet');
const propagate = require('../lib/propagate');
const gif = require('../lib/gif');
const {
  reminderTemplate,
  statusTemplate,
  summaryTemplate
} = require('../lib/mail/templates');

const getData = (template, callback) => {
  async.parallel({
    spreadsheet: clb => {
      spreadsheet.getData((err, data) => clb(err, data));
    },
    positiveImage: clb => {
      gif.findPositive((err, data) => clb(err, data));
    },
    negativeImage: clb => {
      gif.findNegative((err, data) => clb(err, data));
    }
  }, (err, results) => {
    if (err) {
      return callback(err);
    }

    const data = results.spreadsheet;
    data.images = {
      positive: results.positiveImage,
      negative: results.negativeImage,
    };

    // console.log(data);

    template.render(data)
      .then( compile => {
        callback(null, compile);
      });
  });
};

const respond = (req, res, next, template) => {
  getData(template, (err, data) => {
    if (err) {
      let error = new Error(err);
      error.status = 500;
      return next(error);
    }
    res.send(data.html);
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
