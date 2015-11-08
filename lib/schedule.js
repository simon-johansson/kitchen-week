
import schedule from 'node-schedule';
import propagate from './propagate';
import getTemplateData from './getTemplateData';
import {
  sendReminderEmail,
  sendStatusEmail,
  sendSummaryEmail,
} from './mail';

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

const sendEmail = (emailType) => {
  getTemplateData()
  .then(emailType)
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
