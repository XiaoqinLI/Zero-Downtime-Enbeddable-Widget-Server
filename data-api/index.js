// Globals
lodashMergeFunc = require('lodash/object/merge');

var express = require('express'),
    bodyParser = require('body-parser');

// from components and libs
var config = require('./lib/config-load')(),
    mongooseConn    = require('./lib/mongoose-connection'),
    physicianRouter = require('./components/physicians/routes')(express);

var createApp = function(config) {
  var appExpress = express();
  appExpress.config = config;
  mongooseConn(appExpress, config);

  return appExpress;
};

var startApp = function() {
  var app = createApp(config);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', function(req, res) {
    res.json({ message: 'hello world!'});
  });

  app.get('/api', function(req, res) {
    res.json({ message: 'hooray! welcome to our api'});
  });
  
  // all of our api routes will be prefixed with /api
  app.use('/api', physicianRouter);

  app.listen(config.port);
  console.log("Listening on", config.port);
};

startApp();


