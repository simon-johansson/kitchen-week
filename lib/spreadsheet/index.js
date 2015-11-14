
import config from '../../config';
import propagate from '../propagate';
import {
  getRows,
  getFormatedData,
  getThisWeeksRow,
  addDataToRow,
  saveRow
} from './utils';

export const giveFeedback = (typeOfFeedback) => {
  const addData = row => addDataToRow(row, typeOfFeedback);

  return getRows()
    .then(getThisWeeksRow)
    .then(addData)
    .then(saveRow);
};

export const getData = () => getRows().then(getFormatedData);

