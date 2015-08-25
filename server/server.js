/**
 * Created by arminhammer on 8/20/15.
 */
var express = require("express");
var server = express();
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var rubbertiger = require('rubbertiger');

var port = process.env.PAPERDUCKY_PORT || 3000;
var env = process.env.PAPERDUCKY_ENV || 'development';
var scraperDir = path.resolve(__dirname, 'scrapers');

var scrapers = {};

//Set up access logging
if (env === 'production') {
  server.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../access.log' }));
} else {
  server.use(morgan('dev'));
}

var initScrapers = function(cb) {
  console.log('Initializing scrapers.');
  console.log(scraperDir);
  var files = fs.readdirSync(scraperDir);
  files.forEach(function(file) {
    var data = fs.readFileSync(path.resolve(scraperDir,file), 'utf8');

    scrapers[file.substr(0, file.indexOf('.json'))] = JSON.parse(data);
  });

  cb();
};

initScrapers(function() {
  console.log(scrapers);
  console.log('Scrapers initialized.');
});

server.get("/api/describe", function (req, res) {
  res.send(JSON.stringify(scrapers,null,2));
});

server.get("/api/describe/:name", function (req, res) {
  res.send(JSON.stringify(scrapers[req.params.name],null,2));
});

server.post("/api/exec/:name", function (req, res) {
  res.send(JSON.stringify(scrapers[req.params.name],null,2));
});

server.use('/dashboard', express.static('./dist'));

server.listen(port);
console.log('Server listening on port',port);
