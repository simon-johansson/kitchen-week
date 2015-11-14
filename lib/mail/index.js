
import transporter from './transporter';
import {getOptions} from './utils';
import {
  reminderTemplate,
  statusTemplate,
  summaryTemplate
} from './templates';

const send = (template, data, subject) => {
  return template.render(data)
    .then(compiledTemplate => {
      return getOptions(data, compiledTemplate, subject);
    })
    .then(options => transporter.sendMail(options));
};

export const sendReminderEmail = (data) => {
  const subject = `You're a kitchen hero this week!`;
  return send(reminderTemplate, data, subject);
};

export const sendStatusEmail = (data) => {
  const subject = 'Praise update'; // day x of y
  return send(statusTemplate, data, subject);
};

export const sendSummaryEmail = (data) => {
  const subject = `You're no longer a kitchen hero`;
  return send(summaryTemplate, data, subject);
};
