
import {merge, sample} from 'lodash';
import nop from 'nop';
import transporter from './transporter';
import config from '../../config';
import propagate from '../propagate';

const foodEmojis = ['🍺', '🍪', '🍩', '🍴', '🔪', '🍳', '🍲', '🍄',
                    '🍔', '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍',
                    '🍏', '🍐', '🍑', '🍒', '🍓', '🍅', '🍆', '🌽',
                    '🌰', '🍞', '🍖', '🍗', '🍔', '🍟', '🍕', '🍎'];

const setRecivers = (addresses = '') => {
   // if (config.email.willAlwaysRecive) {
   //  return `${addresses}, ${config.email.willAlwaysRecive}`;
   // } else {
   //  return addresses;
   // }
   return config.email.willAlwaysRecive;
};

const createSubject = (text) => {
  return `${sample(foodEmojis)} ${text} ${sample(foodEmojis)}`;
};

const concatEmails = emails => emails.join(', ');

export const getOptions = (data, template, subject) => {
  const options = {};
  const addresses = concatEmails(data.thisWeek.emails);
  // options.subject = createSubject(subject);
  options.subject = subject;
  options.to = setRecivers(addresses);
  options.from = config.email.fromEmail;
  options.html = template.html;
  options.text = template.text;
  return options;
};

export const send = (options, callback = nop) => {
  transporter.sendMail(options, propagate(callback, info => {
    callback(null, 'Message sent: ' + info.response);
  }));
};
