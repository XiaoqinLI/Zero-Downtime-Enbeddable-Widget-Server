'use strict';

var cluster = require('cluster'),
    os = require('os');

var initMaster;

initMaster = function() {

  cluster.on('disconnect', function() {
    console.error('Cluster worker disconnect! Forking new worker.');
    cluster.fork();
  });

  var workerCount = process.argv[3] || os.cpus().length,
      i = workerCount;
      
  while(i--) {
    cluster.fork();
  }
};

module.exports = function balance(init) {
  return cluster.isMaster? initMaster() : init();
};