
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

const createSubject = (text) => {
  return `${sample(foodEmojis)} ${text} ${sample(foodEmojis)}`;
};

const getOptions = (data, template, subject) => {
  const obj = {};
  const addresses = concatEmails(data.thisWeek.emails);
  obj.subject = createSubject(subject);
  obj.to = setRecivers(addresses);
  obj.from = config.email.fromEmail;
  obj.html = template.html;
  obj.text = template.text;
  return merge(defaultOptions, obj);
};

const concatEmails = emails => {
  return emails.join(', ');
};

export const send = (options, callback) => {
  transporter.sendMail(options, propagate(callback, info => {
    callback(null, 'Message sent: ' + info.response);
  }));
};
