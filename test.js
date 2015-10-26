var low = require('lowdb');
var db = low('db.json');

// db('feedback').push({
//   positive: true
// });

db('feedback').push({
  negative: true,

});

var pos = db('feedback').chain().where({positive: true}).value();
  // .size();

var neg = db('feedback')
  .chain()
  .where({negative: true})
  .value()
  // .size();

console.log(pos.length, neg.length);

db('feedback').remove();
