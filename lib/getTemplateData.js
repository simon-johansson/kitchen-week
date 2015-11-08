
import {getData as getSpreadsheetData} from './spreadsheet';
import {getImages} from './gif';

const formatDataForTemplate = (results) => {
  const data = results[0];
  data.images = results[1];
  return data;
};

export default () => {
  return Promise.all([
    getSpreadsheetData(),
    getImages(),
  ])
  .then(formatDataForTemplate);
};
