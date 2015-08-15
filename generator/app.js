#!/usr/bin/env node
'use strict';

// NPM Modules
var express = require('express');

// Require our base lib modules
var config = require('./lib/config-load')(),
    balance = require('./lib/balance'),
    mongoose = require('./lib/mongoose'),
    redis = require('./lib/redis'),
    middleware = require('./lib/middleware');

// Require our components
var physicianCard = require('./components/physician-card');

// Local functions and vars
var createApp, startApp, debugMode, simpleMode;


// Decorate express with our components
createApp = function (config) {
  var app = express();
  app.config = app.locals.config = config;

  // libs
  if (config.use_mongo) {
    mongoose(app, config);
  }

  if (config.use_redis) {
    redis(app);
  }

  middleware(app);

  // components
  physicianCard(app);

  return app;
};

startApp = function () {
  var app = createApp(config);
  
  app.listen(config.port);
  console.log('Listening on', app.config.host);
};

// Expose the app
module.exports = createApp;

// Start listening if the app has been started directly
if (module === require.main) {
  debugMode = ( process.execArgv && process.execArgv[0] && process.execArgv[0].indexOf('--debug') > -1);
  simpleMode = ( process.argv[2] === 'simple' );

  if (debugMode || simpleMode) {
    startApp();
  } else {
    //balance(startApp);
    startApp();
  }
}