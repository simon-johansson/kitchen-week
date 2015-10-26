
const {first, filter} = require('lodash');
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

const convertEmailToName = emails => {
  return emails.map(email => {
    const names = email.split('@')[0].split('.');
    return names.map(name => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }).join(' ');
  });
};

const extractData = row => {
  const splitAndTrim = (row, prop) => {
    return row[prop].split(',').map(p => p.trim());
  };

  const emails = splitAndTrim(row, 'emails');
  const names = convertEmailToName(emails);

  return {
    week: row.week,
    names,
    emails
  };
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

export const getFormatedDataForThisWeek = rows => {
  const currentWeek = currentWeekNumber();
  const row = pluckRow(rows, currentWeek.toString());
  return extractData(row);
};

export const getFormatedDataForNextWeek = rows => {
  const currentWeek = currentWeekNumber();
  const nextWeek = currentWeek === 52 ? 1 : currentWeek + 1;
  const row = pluckRow(rows, nextWeek.toString());
  return extractData(row);
};
