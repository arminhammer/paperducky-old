/**
 * Created by arminhammer on 8/20/15.
 */
var express = require("express");
var server = express();

var port = process.env.PAPERDUCKY_PORT || 3000;
var environment = process.env.PAPERDUCKY_ENV || 'development';

server.get("/test", function (req, res) {
  res.send("Well, that worked, just fine.");
});

server.use(express.static('./dist'));

server.all('/*', function(req, res) {
  res.sendFile('index.html', { root: 'dist' });
});

server.listen(port);
console.log('Server listening on port',port);
