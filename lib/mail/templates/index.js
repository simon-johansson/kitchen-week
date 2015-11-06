
import {resolve} from 'path';
import _ from 'lodash';
import {EmailTemplate} from 'email-templates';

const getTemplate = (dir) => {
  const templateDir = resolve(__dirname, dir);
  return new EmailTemplate(templateDir);
};

export default {
  reminderTemplate: getTemplate('reminder'),
  statusTemplate: getTemplate('status'),
  summaryTemplate: getTemplate('summary')
};

