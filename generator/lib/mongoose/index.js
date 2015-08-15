'use strict';

var mongoose = require('mongoose');

module.exports = function(app, config) {
  // only connect once
  if (mongoose.connection.readyState !== 0) {
    return;
  }

  var connectString = config.mongolab_uri || config.mongoose_url,
      mongoOptions = { db: { safe: true }};

  mongoose.connect(connectString, mongoOptions, function(err) {
    if (err) {
      console.log ('ERROR connecting to: ' + connectString + '. ' + err);
    } else {
      console.log ('Mongoose connected to: ' + connectString);
    }
  });
};