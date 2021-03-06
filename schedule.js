
import schedule from 'node-schedule';
import propagate from './lib/propagate';
import getTemplateData from './lib/getTemplateData';
import {
  sendReminderEmail,
  sendStatusEmail,
  sendSummaryEmail,
} from './lib/mail';

const rules = {
  reminderEmail: {
    dayOfWeek: [1],
    hour: 8,
    minute: 0,
  },
  statusEmail: {
    dayOfWeek: [new schedule.Range(1, 4)],
    hour: 16,
    minute: 0,
  },
  summaryEmail: {
    dayOfWeek: [5],
    hour: 16,
    minute: 0,
  }
};

const sendEmail = (emailType) => {
  getTemplateData()
    .then(emailType)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};

schedule.scheduleJob(rules.reminderEmail, () => {
  sendEmail(sendReminderEmail);
});

schedule.scheduleJob(rules.statusEmail, () => {
  sendEmail(sendStatusEmail);
});

schedule.scheduleJob(rules.summaryEmail, () => {
  sendEmail(sendSummaryEmail);
});

// sendEmail(sendReminderEmail);
// sendEmail(sendStatusEmail);
// sendEmail(sendSummaryEmail);
