
var _ = require('lodash');
var GoogleSpreadsheet = require("google-spreadsheet");
var currentWeekNumber = require('current-week-number');

// spreadsheet key is the long id in the sheets URL
var kitchenSheet = new GoogleSpreadsheet('194KFEJH7_sUGNTPGAj962hOQjGVSKftgQsUGftLaHp4');
var sheetNumber = 1;

function extractData (row) {
  var splitAndTrim = function (row, prop) {
    return row[prop].split(',').map(function (p) {
      return p.trim();
    });
  };

  var names = splitAndTrim(row, 'names');
  var emails = splitAndTrim(row, 'emails');

  return {
    number: row.week,
    names: names,
    emails: emails
  };
}

function pluckRow (rows, week) {
  return _.first(_.filter(rows, {week: week}));
}

function getThisWeek (rows) {
  var currentWeek = currentWeekNumber();

  var row = pluckRow(rows, currentWeek.toString());
  return extractData(row);
}

function getNextWeek (rows) {
  var currentWeek = currentWeekNumber();
  var nextWeek = currentWeek === 52 ? 1 : currentWeek + 1;

  var row = pluckRow(rows, nextWeek.toString());
  return extractData(row);
}

module.exports = {
  getData: function (callback) {

    kitchenSheet.getRows(sheetNumber, function(error, rows){
      if(error){ return callback(error); }
      var data = {
        thisWeek: getThisWeek(rows),
        nextWeek: getNextWeek(rows)
      };
      callback(null, data);
    });
  }
};
