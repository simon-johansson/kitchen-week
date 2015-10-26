
const schedule = require('node-schedule');
const {getData} = require('./spreadsheet');
const {
  sendReminderEmail,
  sendStatusEmail,
  sendSummaryEmail,
} = require('./mail');
const propagate = require('./propagate');

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

const sendEmail = (type, callback) => {
  getData(propagate(callback, data => {
    type(data, propagate(callback, msg => {
      callback(null, msg);
    }));
  }));
};

// const sendReminderEmail = (callback) => {
//   getData(propagate(callback, data => {
//     sendReminderEmail(data, propagate(callback, msg => {
//       callback(null, msg);
//     }));
//   }));
// };

// const sendStatusEmail = (callback) => {
//   getData(propagate(callback, data => {
//     sendStatusEmail(data, propagate(callback, msg => {
//       callback(null, msg);
//     }));
//   }));
// };

// const summaryEmail = (callback) => {
//   getData(propagate(callback, data => {
//     summaryEmail(data, propagate(callback, msg => {
//       callback(null, msg);
//     }));
//   }));
// };

schedule.scheduleJob(rules.reminderEmail, () => {
  sendEmail(sendReminderEmail, (err, msg) => {
    if (err) { console.error(err); }
    else { console.log(msg); }
  });
});

// schedule.scheduleJob(rules.statusEmail, () => {

// });

// schedule.scheduleJob(rules.summaryEmail, () => {

// });


