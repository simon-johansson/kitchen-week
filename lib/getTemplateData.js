
import {getData as getSpreadsheetData} from './spreadsheet';
import {getImages} from './gif';
import feedbackTypes from './feedbackTypes';

const formatDataForTemplate = (results) => {
  const data = results[0];
  data.images = results[1];
  data.feedbackTypes = feedbackTypes;
  // console.log(data);
  return data;
};

export default () => {
  return Promise.all([
    getSpreadsheetData(),
    getImages(feedbackTypes),
  ])
  .then(formatDataForTemplate);
};
