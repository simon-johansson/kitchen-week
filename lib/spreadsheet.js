
var _ = require('lodash');
var GoogleSpreadsheet = require("google-spreadsheet");
var currentWeekNumber = require('current-week-number');
var config = require('../config');
// var googleCredentials = require('../google-generated-creds.json');
var utils = require('./utils');

var spreadsheet = new GoogleSpreadsheet(config.spreadsheetID);
var sheetNumber = 1;

function pluckRow (rows, week) {
  return _.first(_.filter(rows, {week: week}));
}

function getRows (callback) {
  spreadsheet.useServiceAccountAuth(config.keys.google, function(err){
    spreadsheet.getRows(sheetNumber, function (error, rows) {
      if(error){ return callback(error); }
      callback(null, rows);
    });
  });
}

function getThisWeeksRow (rows) {
  var currentWeek = currentWeekNumber();
  return pluckRow(rows, currentWeek.toString());
}

function extractData (row) {
  var splitAndTrim = function (row, prop) {
    return row[prop].split(',').map(function (p) {
      return p.trim();
    });
  };

  var emails = splitAndTrim(row, 'emails');
  var names = utils.convertEmailToName(emails)

  return {
    week: row.week,
    names: names,
    emails: emails
  };
}

function getFormatedDataForThisWeek (rows) {
  var currentWeek = currentWeekNumber();
  var row = pluckRow(rows, currentWeek.toString());
  return extractData(row);
}

function getFormatedDataForNextWeek (rows) {
  var currentWeek = currentWeekNumber();
  var nextWeek = currentWeek === 52 ? 1 : currentWeek + 1;
  var row = pluckRow(rows, nextWeek.toString());
  return extractData(row);
}

module.exports = {
  getData: function (callback) {
    spreadsheet.getRows(sheetNumber, function(error, rows){
      if(error){ return callback(error); }
      var data = {
        thisWeek: getFormatedDataForThisWeek(rows),
        nextWeek: getFormatedDataForNextWeek(rows)
      };
      callback(null, data);
    });
  },

  addPositive: function (callback) {
    getRows(function (error, rows) {
      if(error){ return callback(error); }
      var row = getThisWeeksRow(rows);
      var positives = parseInt(row.positive || 0);
      row.positive = positives + 1;
      row.save(function (error) {
        callback(error);
      });
    });
  },

  addNegative: function (callback) {
    getRows(function (error, rows) {
      if(error){ return callback(error); }
      var row = getThisWeeksRow(rows);
      var negatives = parseInt(row.negative || 0);
      row.negative = negatives + 1;
      row.save(function (error) {
        callback(error);
      });
    });
  }
};
