
const {sample} = require('lodash');
const Giphy = require( 'giphy' );
const {keys} = require('../config');
const propagate = require('./propagate');

const giphy = new Giphy(keys.giphy);
const positiveSearches = ['thumbs up', 'applause'];
const negativeSearches = ['facepalm', 'thumbs down', 'dissapointed'];

export const findPositive = (callback) => {
  const query = sample(positiveSearches);
  giphy.search({q: query}, propagate(callback, data => {
    // format response?
    callback(data);
  }));
};

export const findNegative = (callback) => {
  const query = sample(negativeSearches);
  giphy.search({q: query}, propagate(callback, data => {
    // format response?
    callback(data);
  }));
};
