
import {
  first,
  filter,
  forOwn,
  remove,
  sortByOrder,
  take,
} from 'lodash';
import moment from 'moment';
import GoogleSpreadsheet from 'google-spreadsheet';
import currentWeekNumber from 'current-week-number';
import feedbackTypes from '../feedbackTypes';
import {spreadsheetID, keys} from '../../config';
import propagate from '../propagate';

const spreadsheet = new GoogleSpreadsheet(spreadsheetID);
const {useServiceAccountAuth} = spreadsheet;

let sheetNumber;
if (process.env.NODE_ENV === 'production') {
  sheetNumber = 1;
} else {
  sheetNumber = 2;
}

const pluckRow = (rows, week = currentWeekNumber()) => {
  return first(filter(rows, {week: week.toString()}));
};

const pluckRows = (rows, weeks) => {
  return weeks.map((week) => pluckRow(rows, week.toString()));
};

const splitLines = lines => {
  return lines.length > 1 ? lines.split('\n').map(l => l.trim()) : [''];
};

const extractNames = cellData => {
  const lines = splitLines(cellData);
  return lines.map(line => {
    let names;
    const seperateName = line.match(/\((.*?)\)/);
    if (seperateName) names = seperateName[1].split(' ');
    else names = line.split('@')[0].split('.');
    return names.map(name => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }).join(' ');
  });
};

const extractEmails = cellData => {
  const lines = splitLines(cellData);
  return lines.map(l => l.replace(/ *\([^)]*\) */g, ''));
};

const retriveFeedbackData = (row) => {
  let data;
  try {
    data = JSON.parse(row.data);
  } catch (err) {
    data = [[], []];
  }
  return data;
};

const formatData = row => {
  const today = moment().startOf('day');
  const feedback = [{today:0, total:0}, {today:0, total:0}];
  const emails = extractEmails(row.heroes);
  const names = extractNames(row.heroes);
  const week = row.week;
  const feedbackData = retriveFeedbackData(row);
  let score = 0;

  feedbackData.forEach((feedbackType, index) => {
    feedbackType.forEach(el => {
      if (today.isSame(el.time, 'd')) {
        feedback[index].today += 1;
      }
      feedback[index].total += 1;
      score += 1;
    });
  });

  return {
    week, names, emails, feedback, score
  };
};

const formatHighscore = (rows) => {
  rows = rows.map(formatData);
  remove(rows, row => row.score === 0);
  const sorted = sortByOrder(rows, ['score'], ['desc']);
  return sorted;
};

export const saveRow = row => {
  return new Promise((resolve, reject) => {
    row.save((err) => {
      if (err) reject(err);
      else resolve('Saved');
    });
  });
};

export const addDataToRow = (row, feedbackType) => {
  let newDataAdded = false;
  const data = retriveFeedbackData(row);
  const add = index => {
    data[index].push({
      time: new Date().toISOString(),
      type: feedbackType
    });
    newDataAdded = true;
  };

  feedbackTypes.forEach((el, index) => {
    if (feedbackType === el) add(index);
  });

  if (newDataAdded) {
    row.data = JSON.stringify(data);
  }

  return row;
};

export const getRows = () => {
  return new Promise((resolve, reject) => {
    const callback = err => reject(err);

    useServiceAccountAuth(keys.google, propagate(callback, () => {
      spreadsheet.getRows(sheetNumber, propagate(callback, rows => {
        resolve(rows);
      }));
    }));
  });
};

export const getThisWeeksRow = rows => pluckRow(rows);

export const getFormatedData = allRows => {
  const week = currentWeekNumber();
  const prev = week === 1 ? 52 : week - 1;
  const next = week === 52 ? 1 : week + 1;
  const [prevWeek, thisWeek, nextWeek] = pluckRows(allRows, [prev, week, next]);
  const data = {
    prevWeek: formatData(prevWeek),
    thisWeek: formatData(thisWeek),
    nextWeek: formatData(nextWeek),
    highscore: formatHighscore(allRows)
  };
  return data;
};
