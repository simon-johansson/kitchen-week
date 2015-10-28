
const {sample, take} = require('lodash');
const Giphy = require( 'giphy' );
const {keys} = require('../config');
const propagate = require('./propagate');

const giphy = new Giphy(keys.giphy);
const positiveSearches = ['thumbs up', 'applause'];
const negativeSearches = ['thumbs down']; // facepalm, dissapointed

const formatResponse = (response, tag) => {
  const arr = take(response.data, 15);
  const img = sample(arr);

  // console.log(img.images);

  return {
    url: img.images.original.url,
    tag
  };
};

export const findPositive = (callback) => {
  const query = sample(positiveSearches);
  giphy.search({q: query}, propagate(callback, data => {
    // format response?
    callback(null, formatResponse(data, query));
  }));
};

export const findNegative = (callback) => {
  const query = sample(negativeSearches);
  giphy.search({q: query}, propagate(callback, data => {
    // format response?
    callback(null, formatResponse(data, query));
  }));
};
