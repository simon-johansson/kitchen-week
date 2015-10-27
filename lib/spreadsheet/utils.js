
const {
  first,
  filter,
  sortByOrder,
  take,
  without
} = require('lodash');
const moment = require('moment');
const GoogleSpreadsheet = require('google-spreadsheet');
const currentWeekNumber = require('current-week-number');
const {
  spreadsheetID,
  keys,
} = require('../../config');
const propagate = require('../propagate');

const spreadsheet = new GoogleSpreadsheet(spreadsheetID);
const {useServiceAccountAuth} = spreadsheet;
const sheetNumber = 1;

const pluckRow = (rows, week) => {
  return first(filter(rows, {week: week}));
};

const pluckRows = (rows, weeks) => {
  return weeks.map((week) => pluckRow(rows, week.toString()));
};

const convertEmailToName = emails => {
  return emails.map(email => {
    const names = email.split('@')[0].split('.');
    return names.map(name => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }).join(' ');
  });
};

const tryToRetriveFeedbackData = (row) => {
  let data;
  try {
    data = JSON.parse(row.data);
  } catch (err) {}

  if (typeof data === 'undefined') {
    data = {positive: [], negative: []};
  }
  return data;
};

const extractData = row => {
  const splitAndTrim = (row, prop) => {
    return row[prop].split(',').map(p => p.trim());
  };

  const emails = splitAndTrim(row, 'emails');
  const names = convertEmailToName(emails);
  const data = tryToRetriveFeedbackData(row);
  const today = moment().startOf('day');

  const feedback = {
    positive: { total: 0, today: 0, old: 0 },
    negative: { total: 0, today: 0, old: 0 }
  };

  feedback.positive.total = parseInt(row.positive || 0);
  feedback.negative.total = parseInt(row.negative || 0);

  data.positive.forEach((obj) => {
    if (today.isSame(obj.time, 'd')) {
      feedback.positive.today += 1;
    } else {
      feedback.positive.old += 1;
    }
  });

  data.negative.forEach((obj) => {
    if (today.isSame(obj.time, 'd')) {
      feedback.negative.today += 1;
    } else {
      feedback.negative.old += 1;
    }
  });

  return {
    week: row.week,
    names,
    emails,
    feedback
  };
};

const extractHightscoreData = (row) => {
  const data = extractData(row);
  const obj = {};
  // obj.names = `${data.names[0]} & ${data.names[1]}`;
  obj.names = data.names.map((name) => {
    let split = name.split(' ');
    return split.length > 1 ? `${split[0]} ${split[1][0]}.` : split[0];
  }).join(' & ');
  obj.week = data.week;
  obj.score = data.feedback.positive.total - data.feedback.negative.total;
  return obj.score > 0 ? obj : false;
};

const getHighscore = (rows) => {
  rows = rows.map(row => {
    row.score = parseInt(row.positive || 0) - parseInt(row.negative || 0);
    return row;
  });
  let sorted = sortByOrder(rows, ['score'], ['desc']);

  return without(take(sorted, 5).map((row) => {
    return extractHightscoreData(row);
  }), false);
};

export const getRows = callback => {
  useServiceAccountAuth(keys.google, propagate(callback, err => {
    spreadsheet.getRows(sheetNumber, propagate(callback, rows => {
      callback(null, rows);
    }));
  }));
};

export const getThisWeeksRow = rows => {
  const currentWeek = currentWeekNumber();
  return pluckRow(rows, currentWeek.toString());
};

export const getFormatedData = allRows => {
  const highscore = getHighscore(allRows);
  const thisWeek = currentWeekNumber();
  const prevWeek = thisWeek === 1 ? 52 : thisWeek - 1;
  const nextWeek = thisWeek === 52 ? 1 : thisWeek + 1;
  const rows = pluckRows(allRows, [prevWeek, thisWeek, nextWeek]);
  let arr = rows.map((row) => {
    return extractData(row);
  });
  arr.push(highscore);
  return arr;
};
