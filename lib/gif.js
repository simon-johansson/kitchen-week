
var _ = require('lodash');
var Giphy = require( 'giphy' );
var config = require('../config');

var giphy = new Giphy(config.keys.giphy);
var positiveSearches = ['thumbs up', 'applause'];
var negativeSearches = ['facepalm', 'thumbs down', 'dissapointed'];

module.exports = {
  findPositive: function (callback) {
    var query = _.sample(positiveSearches);
    giphy.search({q: query}, function (err, data) {
      // format response?
      callback(data);
    });
  },
  findNegative: function () {
    var query = _.sample(negativeSearches);
    giphy.search({q: query}, function (err, data) {
      // format response?
      callback(data);
    });
  }
}
