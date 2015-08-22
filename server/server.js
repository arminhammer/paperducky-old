/**
 * Created by arminhammer on 8/20/15.
 */
var express = require("express");
var server = express();
var morgan = require('morgan');

var port = process.env.PAPERDUCKY_PORT || 3000;
var env = process.env.PAPERDUCKY_ENV || 'development';

//Set up access logging
if (app.get('env') == 'production') {
  app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../access.log' }));
} else {
  app.use(morgan('dev'));
}

server.get("/test", function (req, res) {
  res.send("Well, that worked, just fine.");
});

server.use('/dashboard', express.static('./dist'));

server.listen(port);
console.log('Server listening on port',port);
