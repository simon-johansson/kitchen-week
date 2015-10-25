
var schedule = require('node-schedule');
var spreadsheet = require('./spreadsheet');
var mail = require('./mail');

var rules = {
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
}

var sendReminderEmail = schedule.scheduleJob(rules.reminderEmail, function(){
  console.log('Tiem to send reminder mail');
  spreadsheet.getData(function (err, data) {
    mail.sendReminderEmail(data, function () {
      console.log('Done');
    });
  });
});

var sendStatusEmail = schedule.scheduleJob(rules.statusEmail, function(){

  console.log('Status mail');
});

var summaryEmail = schedule.scheduleJob(rules.summaryEmail, function(){
  console.log('Summary mail');
});


