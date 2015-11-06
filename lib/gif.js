
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
    // url: img.images.original.url,
    url: img.images.fixed_height.url,
    tag
  };
};

const find = query => {
  return new Promise((resolve, reject) => {
    giphy.search({q: query}, (err, data) => {
      if (err) { return reject(err); }
      resolve(formatResponse(data, query));
    });
  });
};

const findPositive = () => {
  const query = sample(positiveSearches);
  return find(query);
};

const findNegative = () => {
  const query = sample(negativeSearches);
  return find(query);
};

export const getImages = () => {
  const formatResults = results => {
    return {
      positive: results[0],
      negative: results[1],
    };
  };

  return Promise.all([
    findPositive(),
    findNegative()
  ])
  .then(formatResults);
};
