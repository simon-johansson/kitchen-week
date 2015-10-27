
const config = require('../../config');
const propagate = require('../propagate');
const {
  getRows,
  getFormatedData,
  getThisWeeksRow,
} = require('./utils');

const addData = (row, type) => {
  const total = parseInt(row[type] || 0);
  let data;
  row[type] = total + 1;
  try {
    data = JSON.parse(row.data);
  } catch (err) {}

  if (typeof data === 'undefined') {
    data = {positive: [], negative: []};
  }
  data[type].push({
    time: new Date().toISOString()
  });
  row.data = JSON.stringify(data);
  return row;
};

export const getData = callback => {
  getRows(propagate(callback, rows => {
    const arr = getFormatedData(rows);
    const data = {
      prevWeek: arr[0],
      thisWeek: arr[1],
      nextWeek: arr[2],
      highscore: arr[3]
    };
    callback(null, data);
  }));
};

export const addPositive = callback => {
  getRows(propagate(callback, rows => {
    let row = getThisWeeksRow(rows);
    row = addData(row, 'positive');
    row.save(propagate(callback, callback));
  }));
};

export const addNegative = callback => {
  getRows(propagate(callback, rows => {
    let row = getThisWeeksRow(rows);
    row = addData(row, 'negative');
    row.save(propagate(callback, callback));
  }));
};

// addPositive(() => {
//   console.log('done');
// });
