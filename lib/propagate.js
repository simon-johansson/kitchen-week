
const nop = require('nop');

export default (onError, onSuccess = nop) => {
  return (err, ...rest) => {
    err ? onError(err) : onSuccess(...rest);
  };
};
