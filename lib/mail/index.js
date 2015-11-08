
import {send, getOptions} from './utils';
import {
  reminderTemplate,
  statusTemplate,
  summaryTemplate
} from './templates';

const sendEmail = (template, data, subject, callback) => {
  template.render(data)
    .then(compiledTemplate => {
      const options = getOptions(data, compiledTemplate, subject);
      send(options, callback);
    });
};

export const sendReminderEmail = (data, callback) => {
  const subject = '🎉Congratulations! It´s your kitchen week this week. 🎊';
  sendEmail(reminderTemplate, data, subject, callback);
};

export const sendStatusEmail = (data, callback) => {
  const subject = 'Status update'; // day x of y
  sendEmail(statusTemplate, data, subject, callback);
};

export const sendSummaryEmail = (data, callback) => {
  const subject = 'Oh no! Your kitchen week has ended.';
  sendEmail(summaryTemplate, data, subject, callback);
};
