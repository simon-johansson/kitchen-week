
const {resolve} = require('path');
const _ = require('lodash');
const EmailTemplate = require('email-templates').EmailTemplate;

const templateDir_reminder = resolve(__dirname, 'reminder');
const reminderTemplate = new EmailTemplate(templateDir_reminder);

const templateDir_status = resolve(__dirname, 'status');
const statusTemplate = new EmailTemplate(templateDir_status);

const templateDir_summary = resolve(__dirname, 'summary');
const summaryTemplate = new EmailTemplate(templateDir_summary);

export default {
  reminderTemplate,
  statusTemplate,
  summaryTemplate
};

