
import config from '../../config';
import propagate from '../propagate';
import {
  getRows,
  getFormatedData,
  getThisWeeksRow,
} from './utils';

const addDataToRow = (row, col) => {
  const total = parseInt(row[col] || 0);
  let data;
  row[col] = total + 1;
  try {
    data = JSON.parse(row.data);
  } catch (err) {
    data = {positive: [], negative: []};
  }

  if (typeof data === 'undefined') {

  }
  data[col].push({
    time: new Date().toISOString()
  });
  row.data = JSON.stringify(data);
  return row;
};

const giveFeedback = (typeOfFeedback) => {
  const curried = row => addDataToRow(row, typeOfFeedback);

  return getRows()
    .then(getThisWeeksRow)
    .then(curried)
    .then(saveRow);
};

const saveRow = row => {
  return new Promise((resolve, reject) => {
    row.save((err) => {
      if (err) reject(err);
      else resolve('Saved');
    });
  });
};

export const getData = () => getRows().then(getFormatedData);
export const givePositiveFeedback = () => giveFeedback('positive');
export const giveNegativeFeedback = () => giveFeedback('negative');
