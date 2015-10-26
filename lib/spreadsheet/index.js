
const config = require('../../config');
const propagate = require('../propagate');
const {
  getRows,
  getFormatedDataForThisWeek,
  getFormatedDataForNextWeek,
  getThisWeeksRow,
} = require('./utils');

export const getData = callback => {
  getRows(propagate(callback, rows => {
    const data = {
      thisWeek: getFormatedDataForThisWeek(rows),
      nextWeek: getFormatedDataForNextWeek(rows)
    };
    callback(null, data);
  }));
};

export const addPositive = callback => {
  getRows(propagate(callback, rows => {
    const row = getThisWeeksRow(rows);
    console.log(JSON.parse(row.positive).negative);
    // const positives = parseInt(row.positive || 0);
    // row.positive = positives + 1;
    // row.save(propagate(callback, callback));
  }));
};

export const addNegative = callback => {
  getRows(propagate(callback, rows => {
    const row = getThisWeeksRow(rows);
    const negatives = parseInt(row.negative || 0);
    row.negative = negatives + 1;
    row.save(propagate(callback, callback));
  }));
};

addPositive();
