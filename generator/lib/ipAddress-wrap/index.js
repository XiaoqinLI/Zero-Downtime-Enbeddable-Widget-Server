var os = require('os');
var networkInterfaces = os.networkInterfaces();

module.exports =  function getIpAddress() {
  var keys = Object.keys(networkInterfaces);
  for (var x = 0; x < keys.length; ++x) {
      var netIf = networkInterfaces[keys[x]];
      for (var y = 0; y < netIf.length; ++ y) {
          var addr = netIf[y];
          if (addr.family === 'IPv4' && !addr.internal) {
              console.log(addr.address);
              return addr.address;
          }
      }
  }
  
  return '127.0.0.1';
};