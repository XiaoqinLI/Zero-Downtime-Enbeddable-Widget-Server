'use strict';
var ipAddress = require('./lib/ipAddress-wrap')();

var port = process.env.SERVER_PORT || 3333;

module.exports = {
  running_tag: '1.0.0',
  port: port,
  request_timeout: 100000,
  session_secret: "crimsonsecret",
  log_requests: false,
  stylus_compress: 1,
  stylus_debug: 1,
  stylus_force: 1,
  test: false,
  use_redis: false,
  redis: {
    host: "localhost",
    port: 6379,
    auth: "",
    debug: false
  },
  use_mongo: false,
  mongoose_url: "mongodb://localhost/crimsonbase",
  send_mail: true,
  contact_email: "narhe@advisory.com",
  host: 'http://' + ipAddress + ':' + port
};