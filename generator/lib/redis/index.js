'use strict';

var redis = require('redis'),
    url = require('url');

module.exports = function(app) {

  var config = app.config.redis,
      client, auth, redisConnection;

  // check for redis_togo env
  if (app.config.redistogo_url) {
    try {
      redisConnection = url.parse(app.config.redistogo_url);
      config = {
        host: redisConnection.hostname,
        port: redisConnection.port,
        auth: redisConnection.auth
      };
    }
    catch(e) {
      // error pulling redis_togo params
      console.log('Error pulling redis_togo params from ENV', app.config.redistogo_url, e);
    }
  }

  redis.debug_mode = config.debug;
  client = redis.createClient(config.port, config.host, { max_attempts: 1 });

  if (config.auth) {
    auth = (config.auth.indexOf(':') > 0) ? config.auth.split(':')[1] : config.auth;
    client.auth(auth);
  }
  if (config.db) {
    client.select(config.db);
  }
  app.redis = client;

  client.on('ready', function() {
    console.log('Redis connected to: redis://' + config.host + ':' +config.port);
  });

  client.on('error', function() {
    console.log('Error: Redis could not connect to: redis://' + config.host + ':' + config.port);
  });
};