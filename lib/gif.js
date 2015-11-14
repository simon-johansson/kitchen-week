
import {sample, take} from 'lodash';
import Giphy from  'giphy' ;
import {keys} from '../config';
import propagate from './propagate';

const giphy = new Giphy(keys.giphy);

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

export const getImages = (tags) => {
  return Promise.all(tags.map(tag => find(tag)));
};
