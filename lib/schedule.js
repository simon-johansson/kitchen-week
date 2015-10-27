
const async = require('async');
const schedule = require('node-schedule');
const spreadsheet = require('./spreadsheet');
const propagate = require('./propagate');
const gif = require('./gif');
const {
  sendReminderEmail,
  sendStatusEmail,
  sendSummaryEmail,
} = require('./mail');

const rules = {
  reminderEmail: {
    dayOfWeek: [1],
    hour: 8,
    minute: 0,
  },
  statusEmail: {
    dayOfWeek: [new schedule.Range(1, 4)],
    hour: 15,
    minute: 0,
  },
  summaryEmail: {
    dayOfWeek: [5],
    hour: 15,
    minute: 0,
  }
};

const getData = callback => {
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

    callback(null, data);
  });
};

const sendEmail = (type, callback) => {
  getData(propagate(callback, data => {
    type(data, propagate(callback, msg => {
      callback(null, msg);
    }));
  }));
};

// schedule.scheduleJob(rules.reminderEmail, () => {
//   sendEmail(sendReminderEmail, (err, msg) => {
//     if (err) { console.error(err); }
//     else { console.log(msg); }
//   });
// });

// schedule.scheduleJob(rules.statusEmail, () => {
//   sendEmail(sendStatusEmail, (err, msg) => {
//     if (err) { console.error(err); }
//     else { console.log(msg); }
//   });
// });

// schedule.scheduleJob(rules.summaryEmail, () => {
//   sendEmail(sendSummaryEmail, (err, msg) => {
//     if (err) { console.error(err); }
//     else { console.log(msg); }
//   });
// });

// sendEmail(sendReminderEmail, (err, msg) => {
//   if (err) { console.error(err); }
//   else { console.log(msg); }
// });

// sendEmail(sendStatusEmail, (err, msg) => {
//   if (err) { console.error(err); }
//   else { console.log(msg); }
// });
