
import {merge, sample} from 'lodash';
import nop from 'nop';
import config from '../../config';
import propagate from '../propagate';

const foodEmojis = ['🍺', '🍪', '🍩', '🍴', '🔪', '🍳', '🍲', '🍄',
                    '🍔', '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍',
                    '🍏', '🍐', '🍑', '🍒', '🍓', '🍅', '🍆', '🌽',
                    '🌰', '🍞', '🍖', '🍗', '🍔', '🍟', '🍕', '🍎'];

const setRecivers = (addresses = '') => {
  const {willAlwaysRecive} = config.email;
  if (process.env.NODE_ENV === 'production') {
    if (willAlwaysRecive) {
      return `${addresses}, ${willAlwaysRecive}`;
    } else {
      return addresses;
    }
  } else {
    return willAlwaysRecive ? willAlwaysRecive : '';
  }
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
