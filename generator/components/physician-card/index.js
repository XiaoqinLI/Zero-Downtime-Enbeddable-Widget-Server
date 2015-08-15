var config = require('../../lib/config-load')();

var path = require('path'),
  fs = require('fs');

var express = require('express');

var localApp = express.Router();

localApp.get('/html/:id', function(req, res){
  res.render(path.join(__dirname, 'view/index'), {
    id: req.params.id,
    gateway: req.headers.host,
    host: config.host,
    port: req.headers.port,
    version: config.running_tag
  });
});

localApp.get('/js/:id?', function(req, res){
  fs.readFile(path.normalize(__dirname + '/styles/physicianCard.css'), function(err, data) {
    data = ((!err && data && data.toString()) || '').replace( /(?:\r\n|\r|\n)/g , ' ');
    res.render(path.join(__dirname, 'public/initial.js'), {
      id: req.params.id,
      gateway: req.headers.host,
      inlineCss: data,
      host: config.host,
      port: req.headers.port,
      version: config.running_tag
    });
  });
    
});

module.exports = function(app) {
  app.use('/widget', localApp);
};