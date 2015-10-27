
const {merge, sample} = require('lodash');
const transporter = require('./transporter');
const config = require('../../config');
const propagate = require('../propagate');

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

const concatEmails = emails => {
  return emails.join(', ');
};

const createSubject = (text) => {
  return `${sample(foodEmojis)} ${text} ${sample(foodEmojis)}`;
};

export const getOptions = (data, template, subject) => {
  const options = {};
  const addresses = concatEmails(data.thisWeek.emails);
  options.subject = createSubject(subject);
  options.to = setRecivers(addresses);
  options.from = config.email.fromEmail;
  options.html = template.html;
  options.text = template.text;
  return options;
};

export const send = (options, callback) => {
  transporter.sendMail(options, propagate(callback, info => {
    callback(null, 'Message sent: ' + info.response);
  }));
};
