
const {send, getOptions} = require('./utils');
const {
  reminderTemplate,
  statusTemplate,
  summaryTemplate
} = require('./templates');

export const sendReminderEmail = (data, callback) => {
  reminderTemplate.render(data)
    .then(template => {
      const subject = '🎉Congratulations! It´s your kitchen week this week. 🎊';
      const options = getOptions(data, template, subject);
      send(options, callback);
    });
};

export const sendStatusEmail = (data, callback) => {
  statusTemplate.render(data)
    .then(template => {
      const subject = 'Status update'; // day x of y
      const options = getOptions(data, template, subject);
      send(options, callback);
    });
};

export const sendSummaryEmail = (data, callback) => {
  summaryTemplate.render(data)
    .then(template => {
      const subject = 'Oh no! Your kitchen week has ended.';
      const options = getOptions(data, template, subject);
      send(options, callback);
    });
};
