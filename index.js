
// Initiate babel for ES2015 code
require('babel/register');

// Start scheduled events
require('./lib/schedule');

// Initiate and start server
var app = require('./app');

app.set('port', process.env.PORT || 22334);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
