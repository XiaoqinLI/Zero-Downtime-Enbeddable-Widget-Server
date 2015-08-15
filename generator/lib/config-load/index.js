var _ = require('lodash');

module.exports = function loadConfig() {
  'use strict';

  var public_config = require('../../config.default'),
    private_config;

  try {
    private_config  = require('../../config.local');
  }
  catch(e) {
    private_config = {};
  }

   // add environment variables as overriding factors
  _.forEach(process.env, function(value, index) {
    private_config[index.toLowerCase()] = value;
  });

  return _.extend(public_config, private_config);
};